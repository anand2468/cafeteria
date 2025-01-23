import React, { useEffect, useState } from "react";
import { db, auth } from "../services/fbservice";
import { collection, addDoc, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Dashboard = () => {
          const [menuItems, setMenuItems] = useState([]);
          const [newItem, setNewItem] = useState({ name: "", price: "", category: "", preparationTime: "", available: true });
          const navigate = useNavigate();

          // Fetch menu items
          useEffect(() => {
                    const unsub = onSnapshot(collection(db, "menu"), (snapshot) => {
                              const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                              setMenuItems(items);
                    });
                    return () => unsub();
          }, []);
          

          // Handle adding new items
          const handleAddItem = async () => {
                    if (!newItem.name || !newItem.price || !newItem.category || !newItem.preparationTime) {
                              alert("Please fill all fields!");
                              return;
                    }

                    await addDoc(collection(db, "menu"), newItem);
                    setNewItem({ name: "", price: "", category: "", preparationTime: "", available: true });
          };

          <button onClick={() => navigate("/add-menu-item")} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Menu Item
          </button>


          // Handle updating availability
          const toggleAvailability = async (id, currentStatus) => {
                    const itemRef = doc(db, "menu", id);
                    await updateDoc(itemRef, { available: !currentStatus });
          };

          // Handle logout
          const handleLogout = async () => {
                    await signOut(auth);
                    navigate("/");
          };

          return (
                    <div className="p-6">
                              <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
                                        Logout
                              </button>

                              <h2 className="text-xl font-semibold mb-2">Add New Menu Item</h2>
                              <div className="flex gap-2 mb-4">
                                        <input
                                                  type="text"
                                                  placeholder="Name"
                                                  value={newItem.name}
                                                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                                  className="border px-2 py-1 rounded"
                                        />
                                        <input
                                                  type="number"
                                                  placeholder="Price"
                                                  value={newItem.price}
                                                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                                  className="border px-2 py-1 rounded"
                                        />
                                        <input
                                                  type="text"
                                                  placeholder="Category"
                                                  value={newItem.category}
                                                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                                  className="border px-2 py-1 rounded"
                                        />
                                        <input
                                                  type="number"
                                                  placeholder="Preparation Time (mins)"
                                                  value={newItem.preparationTime}
                                                  onChange={(e) => setNewItem({ ...newItem, preparationTime: e.target.value })}
                                                  className="border px-2 py-1 rounded"
                                        />
                                        <button onClick={handleAddItem} className="bg-green-500 text-white px-4 py-2 rounded">
                                                  Add
                                        </button>
                              </div>

                              <h2 className="text-xl font-semibold mb-2">Menu Items</h2>
                              <ul>
                                        {menuItems.map((item) => (
                                                  <li key={item.id} className="flex justify-between items-center border p-2 mb-2">
                                                            <span>
                                                                      {item.name} - ${item.price} - {item.category} - {item.preparationTime} mins
                                                            </span>
                                                            <button
                                                                      onClick={() => toggleAvailability(item.id, item.available)}
                                                                      className={`px-4 py-2 rounded ${item.available ? "bg-green-500" : "bg-gray-500"} text-white`}
                                                            >
                                                                      {item.available ? "Available" : "Unavailable"}
                                                            </button>
                                                  </li>
                                        ))}
                              </ul>
                    </div>
          );
};

export default Dashboard;

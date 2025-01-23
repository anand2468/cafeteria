import React, { useState } from "react";
import { db, auth } from "../services/fbservice";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddMenuItem = () => {
  const [menuItem, setMenuItem] = useState({
    name: "",
    price: "",
    category: "",
    preparationTime: "",
    available: true,
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleImageUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setUploading(true);
      const storage = getStorage();
      const imageRef = ref(storage, `menu-images/${menuItem.name}-${Date.now()}`);
      await uploadBytes(imageRef, image);

      // Get the image URL
      const imageUrl = await getDownloadURL(imageRef);

      // Add the menu item to Firestore
      await addDoc(collection(db, "menu"), { ...menuItem, imageUrl });

      alert("Menu item added successfully!");
      setMenuItem({ name: "", price: "", category: "", preparationTime: "", available: true });
      setImage(null);
    } catch (error) {
      console.error("Error uploading image or adding menu item:", error);
      alert("Failed to add menu item");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Menu Item</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={menuItem.name}
          onChange={handleInputChange}
          className="border px-3 py-2 w-full rounded"
          placeholder="Enter item name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={menuItem.price}
          onChange={handleInputChange}
          className="border px-3 py-2 w-full rounded"
          placeholder="Enter price"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          value={menuItem.category}
          onChange={handleInputChange}
          className="border px-3 py-2 w-full rounded"
          placeholder="Enter category (e.g., Drinks, Main Course)"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Preparation Time (mins)</label>
        <input
          type="number"
          name="preparationTime"
          value={menuItem.preparationTime}
          onChange={handleInputChange}
          className="border px-3 py-2 w-full rounded"
          placeholder="Enter preparation time"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border px-3 py-2 w-full rounded"
        />
      </div>

      <button
        onClick={handleImageUpload}
        disabled={uploading}
        className={`w-full px-4 py-2 rounded text-white ${uploading ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
          }`}
      >
        {uploading ? "Uploading..." : "Add Menu Item"}
      </button>
    </div>
  );
};

export default AddMenuItem;

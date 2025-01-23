import React, { useState, useEffect } from 'react';
import { ShoppingCart, Clock, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';

const MenuPage = () => {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  // Mock restaurant data (replace with actual API call)
  const restaurants = {
    'anand': {
      name: 'Anand Cafe',
      items: [
        { id: 1, name: 'Burger', price: 12.99, preparationTime: 20, available: true },
        { id: 2, name: 'Pizza', price: 15.99, preparationTime: 25, available: true },
        { id: 3, name: 'Pasta', price: 14.50, preparationTime: 15, available: true }
      ]
    },
    'coffee': {
      name: 'Coffee House',
      items: [
        { id: 4, name: 'Espresso', price: 3.99, preparationTime: 5, available: true },
        { id: 5, name: 'Latte', price: 4.50, preparationTime: 7, available: true }
      ]
    }
  };

  useEffect(() => {
    // Load menu for specific restaurant
    const restaurant = restaurants[id];
    if (restaurant) {
      setMenuItems(restaurant.items);
    }
  }, [id]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        {restaurants[id]?.name || 'Menu'}
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        {menuItems.map(item => (
          <div key={item.id} className="border rounded-lg p-4">
            <h3 className="font-bold text-xl">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="flex items-center">
                <Clock size={16} className="mr-2" />
                {item.preparationTime} mins
              </span>
              <button
                onClick={() => addToCart(item)}
                className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-72">
          <h2 className="text-2xl font-bold mb-4">Cart</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <div className="flex items-center">
                <span className="mr-2">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="border-t mt-4 pt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full bg-green-500 text-white py-2 rounded mt-2 hover:bg-green-600">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
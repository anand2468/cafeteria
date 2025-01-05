import { Children, createContext, useContext, useState } from "react";


const CartContext = createContext();

const useCart = useContext(cartContext)

const cartContextProvider = ({Children})=>{
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
          const itemExists = prevCart.find((item) => item.id === product.id);
          if (itemExists) {
            // Update quantity if item already exists
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            // Add new item with quantity 1
            return [...prevCart, { ...product, quantity: 1 }];
          }
        });
      };
    
      // Remove from cart function
      const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
      };
    

    return (<CartContext.Provider value= {{cart, addToCart, removeFromCart}}>
    {Children}
    </CartContext.Provider>)
}
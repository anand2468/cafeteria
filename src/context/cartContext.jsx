import { createContext } from "react";
import { useState } from "react";

export const CartContext = createContext()
export const CartProvider = ({children}) =>{
    const [cart, setCart] = useState([])
    const addToCart = (item)=>{
        let isthere = cart.find(obj => obj.item_name == item.item_name)
        if (!isthere){
            setCart(prev => [item, ...prev])
        }
        console.log(item)
    }
    const removeFromCart = (item) =>{
        setCart(prev => prev.filter(cartItem => cartItem.item_name != item.item_name))
    }

    return <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart}}>
        {children}
    </CartContext.Provider>
}
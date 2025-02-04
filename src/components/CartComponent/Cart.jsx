import { useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";


const ShowCart = ()=>{
    const {cart, removeFromCart, setCart} = useContext(CartContext)
    useEffect(()=>{
        setCart(cartitems)
    })


    return (<>
      {cart.map(item => <section key={item.id}> {item.item_name}  
        <p>{ item.item_price }</p>
        <button onClick={()=>{
            removeFromCart(item)
        }} 
        className=""> remove from cart </button>
        </section>)}
    </>);
}

export default ShowCart;











// cart items
const cartitems = [
    {category: "noodles",
        count: 1,
        id: "ZmvANDIueuQjnvfkEx9H",
        img_url: "https://firebasestorage.googleapis.com/v0/b/recepies-9f90d.appspot.com/o/anand%2FStuffed%20Maggie.jpeg?alt=media&",
        item_name: "regular Stuffed Maggie",
        item_price: "109"
    },
    {category: "noodles",
        count: 1,
        id: "ZmvANDIueuQjnvfkEx9H",
        img_url: "https://firebasestorage.googleapis.com/v0/b/recepies-9f90d.appspot.com/o/anand%2FStuffed%20Maggie.jpeg?alt=media&",
        item_name: "regular Stuffed Maggie",
        item_price: "109"
    },
]
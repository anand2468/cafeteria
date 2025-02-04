import Header from "../components/Header";
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import { db } from '../services/fbservice'
import { getDoc, getDocs, collection, query, where, doc } from "firebase/firestore";
import { CartContext, CartProvider } from "../context/cartContext";
import ShowCart from "../components/CartComponent/Cart";

const Menu = ()=>{
    const {id} = useParams();
    const [categories, setCategories] = useState(["loading..", "loading...", "loading...."]);
    useEffect(()=>{
        async function loadCategories() {
            const snapshot = await getDoc(doc(db, id,'menu'));
            const data =  snapshot.data()
            setCategories(data.categories)
        }
        loadCategories()
    },[])
    
    return (<>
    <CartProvider>
        <Header />
        {categories && <Nav navItems={categories}/>}
        <div id="contents" className="m-2 sm:divide-y  divide-orange-400 md:w-3/4 md:m-auto">
            {categories && categories.map(category => <ItemSection category={category}  key={category}/> )}
        </div>
        <ShowCart/>
        <Footer/>

    </CartProvider>
    </>)
}



const ItemSection = ({category})=>{
    const cafe = useParams();
    const [items, setItems] = useState([
        { item_name:'loading...', item_price:'__'},
        { item_name:'loading...', item_price:'__'},
        { item_name:'loading...', item_price:'__'},
        { item_name:'loading...', item_price:'__'}
    ])

    useEffect(()=>{
        async function loadItems() {
            const q = query(collection(db, cafe.id), where('category', '==', category))
            const datasnap = await getDocs(q);
            setItems([])
            datasnap.forEach(doc =>{
            setItems(prev => [...prev, {id: doc.id ,...doc.data()}])
            })
        }
        loadItems();
    },[])

    return (<>
        <section id={category} className="">
            <h1 className="text-4xl capitalize my-4 font-serif" >
                {category}
            </h1>
            <div className="gap-3 overflow-x-scroll md:flex">
                {items.map(item =><ItemCard item ={item} key={item.id} />)}
            </div>
        </section>
    </>)
}

const ItemCard = ({item})=>{
    const costs = item.item_price
    const [active, setActive] = useState(Object.keys(costs)[0])
    const {addToCart} = useContext(CartContext)

    return (<>

<article className="mb-4 flex gap-1 rounded-md border p-2  md:flex-col overflow-scroll">
  <div className="mr-2 size-[80px] min-h-[80px] min-w-[80px] overflow-hidden rounded-md bg-slate-200 bg-cover md:mr-0 md:mb-2 md:size-[150px]" style={{'backgroundImage' :"url("+ item.img_url+ ")"}}></div>
  <div className="flex grow justify-between">
    <div className="md:max-w-[150px] max-w-[150px]">
      <h4 className="max-w-[100%] truncate text-lg font-bold uppercase">{item.item_name}</h4> {/** m-1 rounded-sm border border-orange-200 */}
      {Object.keys(costs).map((key)=>
            <button key={key} onClick={()=>{setActive(key)}} className={`border px-2 m-1 rounded-sm text-sm  ${(active==key)? "border-orange-200 bg-orange-50": "border-gray-200 bg-slate-100"}`}>{key}</button>
      )}
      {/* <button className="m-1 rounded-md border border-orange-400 bg-orange-50 px-2 text-sm">regular</button> */}

      <p className="text-sm font-semibold text-zinc-700 italic">rating: 4/5⭐️</p>
    </div>

    <div className="flex flex-col justify-around">
      <p className="text-xl font-extrabold text-orange-800"> &#8377; {costs[active]} /- </p>
      <input type="button" 
      className ="w-full rounded-lg border border-orange-100 bg-orange-200 px-1 py-1 text-slate-800 active:bg-orange-400" 
      onClick={() => addToCart({ count: 1, ...item, item_price:costs[active], item_name:`${active} ${item.item_name}` })} 
      value="Add Item" />
    </div>
  </div>
</article>
        
    </>)
}





export default Menu;



/*
<article className="mb-4 flex gap-1 rounded-md border p-3 hover:shadow-md md:flex-col">

            <div className="mr-2 size-[80px] overflow-hidden rounded-md bg-slate-200 bg-cover md:mr-0 md:mb-2 md:size-[150px]" style={{'backgroundImage' :"url("+ item.img_url+ ")"}}>
                { <img src={url} alt="item image" className="" /> }
                </div>

                <div className="md:max-w-[150px]">
                    <h4 className="max-w-[100%] truncate text-xl font-bold uppercase">{item.item_name}</h4>
                    {Object.keys(costs).map((key)=>
                        <button key={key} onClick={()=>{setActive(key)}} className={`border px-2 m-1 rounded-md text-sm  ${(active==key)? "border-orange-400 bg-orange-50": "border-gray-400 bg-slate-100"}`}>{key}</button>
                    )}
                    <p className="mt-8 text-xl font-extrabold text-orange-800"> &#8377; {costs[active]} /- </p>
                    <p className="text-sm font-semibold text-zinc-700 italic">rating: 4/5⭐️</p>
                </div>
                <div className="grow relative">
                    <input type="button" onClick={() => addToCart({ count: 1, ...item, item_price: (typeof item.item_price == "number") ? item.item_price : costs[active] })} value={"+"}
                        className="rounded-lg border border-orange-100 bg-orange-200 px-1 py-0.5 hover:bg-orange-400 absolute right-0 size-[50px] text-2xl" />
                </div>
            </article>
 */
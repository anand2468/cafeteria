import Header from "../components/Header";
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { act, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import { db } from '../services/fbservice'
import { getDoc, getDocs, collection, query, where, doc } from "firebase/firestore";

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
        <Header />
        {categories && <Nav navItems={categories}/>}
        <div id="contents" className="m-5 sm:divide-y  divide-orange-400 md:w-3/4 md:m-auto">
            {categories && categories.map(category => <ItemSection category={category}  key={category}/> )}
        </div>
        <Footer/>
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
            setItems(prev => [...prev, doc.data()])
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
                {items.map(item =><ItemCard item ={item} key={Math.random()} />)}
            </div>
        </section>
    </>)
}

const ItemCard = ({item})=>{
    const param =useParams()
    const [imgurl, setUrl] = useState(null)
    useEffect(()=>{
        const storage = getStorage();
        const refer = ref(storage, `${param.id}/${item.item_name}.jpeg`)
        const loadurl = async ()=>{
            const imgurl = await getDownloadURL(refer);
            setUrl(imgurl);
        }
        loadurl();
    },[])

    return (<>
        <article className="mb-4 flex rounded-md border p-3 hover:shadow-md md:flex-col">
            <div className="mr-2 size-[100px] rounded-md bg-slate-200 md:mb-2 md:mr-0 md:size-[150px] overflow-hidden bg-cover" style={{'backgroundImage' :"url("+ imgurl+ ")"}}>
                {/* <img src={url} alt="item image" className="" /> */}
            </div>
            <div className="md:max-w-[150px]">
                <h4 className="text-l uppercase font-bold  max-w-[100%] truncate">{item.item_name}</h4>
                {(typeof item.item_price == "number")? <p>{item.item_price}/-</p>: <CostCategory costs={item.item_price} /> }
                <p>4/5</p>
            </div>
        </article>
    </>)
}

const CostCategory= ({costs})=>{
    const [active, setActive] = useState(Object.keys(costs)[0])
    return(<>{
        Object.keys(costs).map((key)=>
            <button key={key} onClick={()=>{setActive(key)}} className=  {`border px-2 m-1 rounded-md text-sm  ${(active==key)? "border-orange-400 bg-orange-50": "border-gray-400 bg-slate-100"}`}>{key}</button>
        )}
        <p>{costs[active]} /- </p>
    </>)
}


export default Menu;
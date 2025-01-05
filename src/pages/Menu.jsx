import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStorage, getDownloadURL, ref } from "firebase/storage";

const Menu = ({categories, data})=>{
    return (<>
        <div id="contents" className="m-5 sm:divide-y  divide-orange-400 md:w-3/4 md:m-auto">
            {categories.map(category => <ItemSection category={category} itemList = {data}  key={category}/> )}
        </div>
    </>)
}

const ItemSection = ({category, itemList})=>{
    return (<>
        <section id="{category}" className="">
            <h1 className="text-4xl capitalize my-4 font-serif" >
                {category}
            </h1>
            <div className="gap-3 overflow-x-scroll md:flex">
                {itemList.map(item =>(item.category == category)? <ItemCard {...item}  key={Math.random()} />:null)}
            </div>
            
        </section>
    </>)
}

const ItemCard = ({item_name, item_price})=>{
    const param =useParams()
    const [imgurl, setUrl] = useState(null)
    useEffect(()=>{
        const storage = getStorage();
        console.log( `${param.id}/${item_name}.jpeg`)
        const refer = ref(storage, `${param.id}/${item_name}.jpeg`)
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
                <h4 className="text-l uppercase font-bold  max-w-[100%] truncate">{item_name}</h4>
                <p>{item_price}/-</p>
                <p>4/5</p>
            </div>
        </article>
    </>)
}

export default Menu;
import { useState } from "react";

const Menu = ({data})=>{
    return (<>
        <div id="contents" class="m-5 sm:divide-y  divide-orange-400 md:w-3/4 md:m-auto">
            {data.map(category => <ItemSection  {...category} /> )}
        </div>
    </>)
}

const ItemSection = ({category, itemList})=>{
    return (<>
        <section id="{category}" className="">
            <h1 class="text-4xl capitalize my-4 font-serif" >
                {category}
            </h1>
            <div className="gap-3 overflow-x-scroll md:flex">
                {itemList.map(item => <ItemCard {...item} key={item.id}/>)}
            </div>
            
        </section>
    </>)
}

const ItemCard = ({itemName, price, rating})=>{

    return (<>
        <article className="mb-4 flex rounded-md border p-3 hover:shadow-md md:flex-col">
            <div className="mr-2 size-[100px] rounded-md bg-slate-200 md:mb-2 md:mr-0 md:size-[150px]"></div>
            <div className="md:max-w-[150px]">
                <h4 className="text-l uppercase font-bold  max-w-[100%] truncate">{itemName}</h4>
                <p>{price}</p>
                <p>{rating}/5</p>
            </div>
        </article>
    </>)
}

export default Menu;
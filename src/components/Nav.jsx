
const Navitem= ({item})=>{
    return (
        <article class="p-2 m-2 rounded-lg hover:bg-orange-600">
            {item}
        </article>
    )
}

const Nav = ({navItems})=>{

    return (<>

        <div id="menu" class="flex flex-wrap m-5 bg-orange-500 text-white rounded-lg">
            {navItems.map(item=> <Navitem item = {item} /> )}
        </div>
    </>)
}

export default Nav;
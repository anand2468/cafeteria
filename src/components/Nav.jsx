import { Navigate } from "react-router-dom"

const Navitem= ({item})=>{
    const scrollToSection = () => {
        const element = document.getElementById(item);
        if (element) {
            console.log('element found')
          element.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
        }
        else{
            console.log("element not found id is" + item)
        }
    };
    return (
        <article className="p-2 m-2 rounded-lg hover:bg-orange-600" onClick={scrollToSection}>
            {item}
        </article>
    )
}

const Nav = ({navItems})=>{

    return (<>

        <div id="menu" className="flex flex-wrap m-5 bg-orange-500 text-white rounded-lg">
            {navItems.map(item=> <Navitem item = {item} key={item}/> )}
        </div>
    </>)
}

export default Nav;
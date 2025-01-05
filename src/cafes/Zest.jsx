import Header from "../components/Header";
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useState, useEffect,  } from "react";
import { useParams } from "react-router-dom";
// import { data } from './dataset/productData'
import Menu from '../pages/Menu'
import { getDoc, getDocs, collection, doc } from 'firebase/firestore'
import { db } from '../services/fbservice'



function Zest() {
    const cafe = useParams()
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [data, setData] = useState([]);
    useEffect(()=>{
      async function fetchData() {
        const snapshot = await getDoc(doc(db, cafe.id,'menu'));
        const data =  snapshot.data()
        setMenuItems(data.categories)
        const datasnap = await getDocs(collection(db, cafe.id));
        setData([]);
        datasnap.forEach(doc =>{
          setData(prev => [...prev, doc.data()])
        })
      }
      fetchData()
    }, [])
    return (
      <div>
        <Header />
        {/* <p>{JSON.stringify(dataa)}</p> */}
        {menuItems && <Nav navItems={menuItems}/>}
        <Menu data={data} categories={menuItems}/>
        <Footer/>
      </div>
    )
  }
  
  export default Zest
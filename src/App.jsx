import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { data } from './dataset/productData'
import Menu from './pages/Menu'

const navItems = ["coffee", 'noodles', 'pastres']


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Nav navItems={navItems}/>
      <Menu data={data}/>
      <Footer/>
    </div>
  )
}

export default App

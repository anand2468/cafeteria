import { BrowserRouter , Route, Routes, Navigate} from "react-router-dom"
import Menu from "./pages/Menu"
import Carousel from "./components/Carousel"

const navItems = ["coffee", 'noodles', 'pastres']


function App() {
  return (
  <Routes>
    <Route path="/" element={ <Navigate to= "/anand"/>}/>
    <Route path="/:id" element={<Menu/>} />
    <Route path="*" element= {<p>pagenot found</p>} />
    <Route path="/test" element={<Carousel />} />
  </Routes>
  )
}

export default App

import { BrowserRouter , Route, Routes} from "react-router-dom"
import Zest from "./cafes/Zest"

const navItems = ["coffee", 'noodles', 'pastres']


function App() {
  return (
  <Routes>
    <Route path="/:id" element={<Zest/>} />
    <Route path="*" element= {<p>pagenot found</p>} />
  </Routes>
  )
}

export default App

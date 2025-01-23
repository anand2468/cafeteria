import { BrowserRouter , Route, Routes, Navigate} from "react-router-dom"
import Menu from "./pages/Menu"
import Dashboard from "./components/Dashboard";
import AddMenuItem from "./AddMenuItem";
const navItems = ["coffee", 'noodles', 'pastres']


function App() {
  return (
  <Routes>
      <Route path="/" element={<Navigate to="/anand" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-menu-item" element={<AddMenuItem />} />

    <Route path="/:id" element={<Menu/>} />
    <Route path="*" element= {<p>pagenot found</p>} />
  </Routes>
  )
}

export default App
  
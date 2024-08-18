import Header from "./components/Header";
import {   Routes  , Route} from 'react-router-dom'
import NotFound from "./components/NotFound";
import AddProduct from "./components/AddProduct";
import Update from "./components/Update";
import List from "./components/List";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import Detail from "./components/Detail";

export default function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/product/:id" element={<Update />} /> 
        <Route path="/detail/:id" element={<Detail />} />       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

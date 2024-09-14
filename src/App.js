import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpdateProduct from './components/UpdateProduct';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import AddProduct from './components/AddProduct';
import Home from './components/Home';
import Prouter from './components/Protected-routers';


function App() {

  return (
    <div className="App">      
      <BrowserRouter>        
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/addproduct" element={<Prouter Component={AddProduct} />} />
          <Route path="/updateproduct" element={<Prouter Component={UpdateProduct} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />          
          <Route path="/*" element={<h1 className='mt-5'>Page Not Found 404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

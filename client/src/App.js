import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddProduct from './components/AddProduct';
import LikedProducts from './components/LikedProducts';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';
import MyProducts from './components/MyProducts';
import MyProfile from './components/MyProfile';

function App() {
  return (
    <div>
      
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/category/:catName" element={<CategoryPage />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path='/add-Product' element={<AddProduct />} />
        <Route exact path='/like-Product' element={<LikedProducts/>}/>
        <Route exact path='/product-detail/:id' element={<ProductDetail/>}/>
        <Route exact path='/my-products' element={<MyProducts/>}/>
        <Route exact path='/my-profile' element={<MyProfile/>}/>
      </Routes>

    </div>
  );
}

export default App;

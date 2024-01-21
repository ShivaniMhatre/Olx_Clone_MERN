import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Categories from './Categories';
import API_URL from '../constant';

const LikedProducts = () => {
    const route = useNavigate();
    const [products, setProducts] = useState([]);
    const [cproducts, setCproducts] = useState([]);
    const [search, setSearch] = useState('');

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         route('/login')
    //     }
    // }, [])

    useEffect(() => {
        const url = API_URL + '/get-like-Product';
        let data = { userId: localStorage.getItem('UserId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.product) {
                    setProducts(res.data.product)
                }
            })
            .catch((err) => {
                toast.error('Server Error')
            })
    }, [])



    const handlesearch = (value) => {
        setSearch(value)
    }
    const handleClick = () => {
        let filteredProduct = products.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) || item.pcate.toLowerCase().includes(search.toLowerCase()) || item.pdesc.toLowerCase().includes(search.toLowerCase())) {
                return item
            }
        })
        setCproducts(filteredProduct)
    }

    const handleCate = (value) => {
        let filteredProduct = products.filter((item) => {
            if (item.pcate == value) {
                return item
            }
        })
        setCproducts(filteredProduct)
    }

    const handleLike = (productId) => {
        let userId = localStorage.getItem('UserId')
        const url = API_URL + '/like-Product'
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                if (res.data.messages) {
                    alert("Liked")
                }
            })
            .catch((err) => {
                alert("server Err")
            })
    }

    const handleProduct = (id) => {
        route('/product-detail/' + id)
    }
    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCate={handleCate} />


            <h3>Search Result:</h3>
            <div className='d-flex justify-content-center flex-wrap'>
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div className='card m-3' key={item._id} onClick={() => handleProduct(item._id)}>
                                <div onClick={() => handleLike(item._id)} className='icon-con'>
                                    <FaHeart className='icons' />
                                </div>
                                <img width="300px" height="200px" src={API_URL + '/' + item.pimage} />
                                <p className='m-2'>{item.pname} | {item.pcate}</p>
                                <h3 className='m-2 text-danger'>{item.pprice}</h3>
                                <p className='m-2 text-success'>{item.pdesc}</p>
                            </div>
                        )
                    })}
            </div>


            <h2>My Products : </h2>
            <div className='d-flex justify-content-center flex-wrap'>
                {products && products.length > 0 &&
                    products.map((item, index) => {
                        return (
                            <div className='card m-3' key={item._id}>
                                <div onClick={() => handleLike(item._id)}  className='icon-con'>
                                    <FaHeart className='icons' />
                                </div>
                                <img width="300px" height="200px" src={API_URL + '/' + item.pimage} />
                                <p className='m-2'>{item.pname} | {item.pcate}</p>
                                <h3 className='m-2 text-danger'>{item.pprice}</h3>
                                <p className='m-2 text-success'>{item.pdesc}</p>
                            </div>
                        )
                    })}
            </div>

        </div>
    )
}

export default LikedProducts
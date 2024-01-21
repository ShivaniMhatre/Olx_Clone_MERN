import React, { useEffect, useState } from 'react'
import './Home.css'
import Header from './Header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Categories from './Categories'
import { FaHeart } from "react-icons/fa";
import API_URL from '../constant'

const CategoryPage = () => {
    const route = useNavigate();
    const param = useParams();
    console.log(param)
    const [products, setProducts] = useState([]);
    const [cproducts, setCproducts] = useState([]);
    const [search, setSearch] = useState('');
    const [issearch, setISsreach] = useState(false);

    useEffect(() => {
        const url = API_URL + '/get-Products?catName=' + param.catName
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setProducts(res.data.product)
                }
            })
            .catch((err) => {
                toast.error('Server Error')
            })
    }, [param])



    const handlesearch = (value) => {
        setSearch(value)
    }
    const handleClick = () => {
        const url = API_URL + '/search?search=' + search;
        axios.get(url)
            .then((res) => {
                setCproducts(res.data.product)
                setISsreach(true)
            })
            .catch((err) => {
                toast.error("ser err")
            })

        // let filteredProduct = products.filter((item) => {
        //     if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
        //         item.pcate.toLowerCase().includes(search.toLowerCase()) ||
        //         item.pdesc.toLowerCase().includes(search.toLowerCase())) {
        //         return item
        //     }
        // })
        // setCproducts(filteredProduct)
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
                if (res.data) {
                    toast.success("Product Added to Liked Product")
                    route('/like-Product')
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
            {issearch && cproducts &&
                <h3>Search Products : <button className='clear-btn' onClick={() => setISsreach(false)}>CLEAR</button>
                </h3>

            }
            {issearch && cproducts && cproducts.length == 0 && <h3>No Result Found</h3>}
            {issearch &&
                <div className='d-flex justify-content-center flex-wrap'>
                    {cproducts && products.length > 0 &&
                        cproducts.map((item, index) => {
                            return (
                                <div className='card m-3' onClick={() => handleProduct(item._id)} key={item._id}>
                                    <div onClick={() => handleLike(item._id)} className='icon-con'>
                                        <FaHeart className='icons' />
                                    </div>
                                    <img width="350px" height="250px" src={API_URL + '/' + item.pimage} />
                                    <h3 className='m-2 price-text'>{item.pprice}</h3>
                                    <p className='m-2'>{item.pname} | {item.pcate}</p>
                                    <p className='m-2 text-success'>{item.pdesc}</p>
                                </div>
                            )
                        })}
                </div>
            }
            {!issearch &&
                <div className='d-flex justify-content-center flex-wrap'>
                    {products && products.length > 0 &&
                        products.map((item, index) => {
                            return (
                                <div className='card m-3' onClick={() => handleProduct(item._id)} key={item._id}>
                                    <div onClick={() => handleLike(item._id)} className='icon-con'>
                                        <FaHeart className='icons' />
                                    </div>
                                    <img width="350px" height="250px" src={API_URL + '/' + item.pimage} />
                                    <h3 className='m-2 price-text'>Rs. {item.pprice}/-</h3>
                                    <p className='m-2'>{item.pname} | {item.pcate}</p>
                                    <p className='m-2 text-success'>{item.pdesc}</p>
                                </div>
                            )
                        })}
                </div>
            }

        </div>
    )
}

export default CategoryPage
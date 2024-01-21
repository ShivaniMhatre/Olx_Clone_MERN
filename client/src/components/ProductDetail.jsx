import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import Header from './Header';
import Carousel from 'react-bootstrap/Carousel'
import './ProductDetail.css'
import API_URL from '../constant';
const ProductDetail = () => {

  const [product, setProduct] = useState()
  const [user, setUser] = useState()
  const p = useParams()

  useEffect(() => {
    const url = API_URL + '/product-detail/' + p.id
    axios.get(url)
      .then((res) => {
        if (res.data.product) {
          setProduct(res.data.product)
        }
      })
      .catch((err) => {
        toast.error('Server Error')
      })
  }, [])


  const handleContact = (addedBy) => {
    console.log("id", addedBy)

    const url = API_URL + '/user-detail/' + addedBy
    axios.get(url)
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user)
        }
      })
      .catch((err) => {
        toast.error('Server Error')
      })
  }
  return (
    <div>
      <Header />
      <div>
        {product &&
          <div className='d-flex justify-content-between flex-wrap'>
            <div className='cols-lg-4'>
              {/* <img width="700px" height="550px" src={'http://localhost:7000/' + product.pimage} alt='' />
              <img width="700px" height="550px" src={'http://localhost:7000/' + product.pimage2} alt='' /> */}
              <Carousel>
                <Carousel.Item>
                  <img width="750px" height="550px" src={API_URL + '/' + product.pimage} alt='' />
                </Carousel.Item>
                <Carousel.Item>
                  <img width="750px" height="550px" src={API_URL + '/' + product.pimage2} alt='' />
                </Carousel.Item>

              </Carousel>

            </div>
            <div className='detail col-lg-6 cols-md-4 m-3 p-3'>
              <h3 className='m-2 price-text'>{product.pprice}</h3>
              <p className='m-2'>{product.pname} | {product.pcate}</p>
              <p className='m-2 text-success'>{product.pdesc}</p>
              {product.addedBy &&
                <button className='show_btn' onClick={() => handleContact(product.addedBy)}>SHOW CONTACT</button>
              }
              {user && user.username &&
                <>
                  <h4 className='m-3'>{user.username}</h4>
                  <h3 className='m-3'>{user.mobile}</h3>
                  <h4 className='m-3'>{user.email}</h4>
                </>

              }
            </div>
          </div>}
      </div>
    </div>
  )
}

export default ProductDetail
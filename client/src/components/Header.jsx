import React, { useState } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUser, FaSearch } from "react-icons/fa";

const Header = (props) => {
  const route = useNavigate()
  const [showover, setShowover] = useState(false)
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('UserId')
    route('/')
  }

  let location = [
    {
      "latitude": 19.218076,
      "longitude": 72.986697,
      "PlaceName": "Mumbai, MH"
    },
    {
      "latitude": 19.218076,
      "longitude": 72.986697,
      "PlaceName": "Thane MH"
    }
  ]
 
  return (
    <div className='header-container d-flex justify-content-between navbar navbar-expand-sm '>
      <div className='header'>
        <Link to="/" className='links'>Home</Link>
        <select value='' onChange={(e) =>
          localStorage.setItem('userLoc', e.target.value)} className='search'>
          {
            location.map((item, index) => {
              return (
                <option value={`${item.latitude},${item.longitude}`}>{item.PlaceName}</option>
              )
            })
          }
        </select>
        <input type='text' className='search '
          value={props && props.search}
          onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)} />
        <button className='search-btn' onClick={() => props.handleClick && props.handleClick()}><FaSearch /></button>
        {/* <span className='mt-3'> Sell And spanurchase...In Your City</span> */}



      </div>
      <div>




        
        <div onClick={() => setShowover(!showover)} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#002f34', display: 'flex', justifyContent: 'center', alignItems: 'center',color:'white'}}><FaRegUser /></div>
        {showover &&
          <div style={{width: '200px', background: '#002f34', position: 'absolute', top: '0', right: '0', marginTop: '55px', marginRight: '50px',zIndex:'1' ,borderRadius:'7px'}}>
            <div>
              {localStorage.getItem('token') &&
                <Link to='/add-Product'>
                  <button className='logout-btn'>ADD PRODUCT</button>
                </Link>
              }
            </div>
            <div>
              {localStorage.getItem('token') &&
                <Link to='/like-Product'>
                  <button className='logout-btn'>FAVOURITES</button>
                </Link>
              }
            </div>
            <div>
              {localStorage.getItem('token') &&
                <Link to='/my-products'>
                  <button className='logout-btn'>MY PRODUCTS</button>
                </Link>
              }
            </div>
            {/* <div>
              {localStorage.getItem('token') &&
                <Link to='/my-profile'>
                  <button className='logout-btn'>MY PROFILE</button>
                </Link>
              }
            </div> */}
            <div>
              {!localStorage.getItem('token') ?
                 <Link to="login"> <button className='logout-btn'>LOGIN </button> </Link> :
                <button onClick={handleLogout} className='logout-btn'>LOGOUT </button>
              }
            </div>

          </div>}
      </div>
    </div>
  )
}

export default Header
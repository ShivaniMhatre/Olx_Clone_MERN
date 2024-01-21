import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import categories from './CategoryList'

const Categories = (props) => {
    const route = useNavigate();
    return (
        <div className='cate-container'>

            <div>
                <span className='p-3'>All Categories</span>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => {
                        return (
                            <span className='category' key={index} onClick={() => route('/category/' + item)}> {item} </span>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Categories
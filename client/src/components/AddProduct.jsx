import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Header from './Header'
import Categories from './CategoryList'
import API_URL from '../constant.js'

const AddProduct = () => {

    const route = useNavigate();
    const [pname, setPname] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [pprice, setPprice] = useState('');
    const [pcate, setPcate] = useState('');
    const [pimage, setPimage] = useState('');
    const [pimage2, setPimage2] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            route('/login')
        }
    }, [])

    const handleApi = async () => {

        const formData = new FormData();
        formData.append('pname', pname)
        formData.append('pdesc', pdesc)
        formData.append('pprice', pprice)
        formData.append('pcate', pcate)
        formData.append('pimage', pimage)
        formData.append('pimage2', pimage2)
        formData.append('userId', localStorage.getItem('UserId'))

        const url = API_URL + '/add-Product';
        axios.post(url, formData)
            .then((res) => {
                if (res.data) {
                    toast.success(res.data.message)
                    route('/')
                }
            })
            .catch((err) => {
                toast.error(err)
            })

        // const token = JSON.parse(localStorage.getItem('token'))

        // const response = await axios.post('http://localhost:7000/add-Product', formData, token)
        // if (response.data) {
        //     route('/yourproduct')
        //     toast.success(response.data.message)
        // } else {
        //     toast.error(response.data.message)
        // }

    }
    return (
        <div>
            <Header />
            <div className='p-3'>
                <h2>Add Product</h2>
                <label>Product Name:</label>
                <input type="text"
                    className='form-control'
                    value={pname}
                    onChange={(e) => { setPname(e.target.value) }} />
                <label>Product Description:</label>
                <input type="text"
                    className='form-control'
                    value={pdesc}
                    onChange={(e) => { setPdesc(e.target.value) }} />
                <label>Product Price:</label>
                <input type="text"
                    className='form-control'
                    value={pprice}
                    onChange={(e) => { setPprice(e.target.value) }} />
                <label>Product Category</label>
                <select className='form-control' value={pcate} onChange={(e) => { setPcate(e.target.value) }}>
                   
                    {
                        Categories && Categories.length > 0 &&
                        Categories.map((item, index) => {
                            return (
                                <option key={'option' + index}>{item}</option>
                            )
                        })
                    }
                </select>
                <label>Product Image:</label>
                <input type="file"
                    className='form-control'
                    onChange={(e) => { setPimage(e.target.files[0]) }}
                />
                <label>Product Second Image:</label>
                <input type="file"
                    className='form-control'
                    onChange={(e) => { setPimage2(e.target.files[0]) }}
                />
                <button onClick={handleApi} className='btn btn-primary mt-3'>SUBMIT</button>
            </div>
        </div>
    )
}

export default AddProduct
import React, { useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import './SignUp.css'
import API_URL from '../constant'

const SignUp = () => {
    const [userData, setUserData] = useState({ username: '', password: '', Confirmpassword: '' });
    const route = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value })
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        if (userData.username && userData.password && userData.Confirmpassword && userData.email && userData.mobile) {
            if (userData.password === userData.Confirmpassword) {
                const url = API_URL + '/signup'
                const response = await axios.post(url, { userData })
                if (response.data.success) {
                    setUserData({ username: '', password: '', Confirmpassword: '' })
                    route('/login')
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            } else {
                toast.error("Password Does not Matched")
            }
        } else {
            toast.error("All Firlds are Mandatory")
        }
        //     console.log({ username, password })
        // const url = "http://localhost:7000/signup";
        // const data = { username, password }
        // axios.post(url, data)
        //     .then((res) => {
        //         console.log(res)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }
    return (
        <div>
            <Header />
            <div className='p-3 m-3'>
                <h4 className='text-center'>Welcome To Signup Page</h4>
                <div className='container'>
                    UserName
                    <input
                        type='text'
                        name='username'
                        onChange={handleChange}
                        className='form-control' /><br />
                    Email
                    <input
                        type='email'
                        name='email'
                        onChange={handleChange}
                        className='form-control' /><br />
                    Mobile No
                    <input
                        type='text'
                        name='mobile'
                        onChange={handleChange}
                        className='form-control' /><br />
                    Password
                    <input
                        type='password'
                        name='password'
                        onChange={handleChange}
                        className='form-control' /><br />
                    Confirm Password
                    <input
                        type='password'
                        name='Confirmpassword'
                        onChange={handleChange}
                        className='form-control' />
                    <br />
                    <button className='btn btn-primary SignUpbtn' onClick={handleSignup}>SignUp</button>
                    <Link className='m-3 text-decoration-none' to="/login">Already Have An Account?</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
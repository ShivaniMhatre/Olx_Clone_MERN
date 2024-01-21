// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const bodyParser = require('body-parser')
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path'
// import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Login,  My_Products, My_Profile, SignUp, User_Detail } from './Controllers/UserController.js';
import { AddProduct, Get_Like_Product, Get_Product, Get_Products, Like_Product, Product_Detail, search } from './Controllers/ProductController.js';

const app = express()
app.use(express.json())
dotenv.config();
app.use(cors())
app.use('/uploads', express.static(path.join('uploads')))

app.get('/', (req, res) => {
  res.send("Hello World")
})

// File Upload 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

// Request 
app.post("/signup", SignUp)
app.post("/login", Login)
app.get('/user-detail/:uId', User_Detail)
app.post("/add-Product", upload.fields([{ name: 'pimage' }, { name: 'pimage2' }]), AddProduct)
app.get('/get-Product', Get_Product)
app.post('/like-Product', Like_Product)
app.post('/get-like-Product', Get_Like_Product)
app.get('/product-detail/:id', Product_Detail)
app.get('/search', search)
app.get('/get-Products', Get_Products)
app.post('/my-products', My_Products)
app.get('/my-profile/:id', My_Profile)
// Port Setting
app.listen(7000, () => {
  console.log(`Example app running om port no 7000`)
})

// DataBase Setting 
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Db Connected")
  })
  .catch((error) => {
    console.log("Error while Connecting MongoDB", error)
  })
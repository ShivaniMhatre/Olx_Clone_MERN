import ProductModel from "../Models/ProductModel.js";
import UserModel from "../Models/UserModel.js";

export const AddProduct = (req, res) => {
    console.log(req.body)


    const plat = req.body.plat;
    const plong = req.body.plong
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const pcate = req.body.pcate;
    const pprice = req.body.pprice;
    const pimage = req.files.pimage[0].path;
    const pimage2 = req.files.pimage2[0].path;
    const addedBy = req.body.userId;

    const product = new ProductModel({
        pname,
        pdesc,
        pcate,
        pprice,
        pimage,
        pimage2,
        addedBy
    });
    product.save()
        .then(() => {
            res.send({ message: "saved success" })
        })
        .catch(() => {
            res.send({ message: "server err" })
        })
}

export const Get_Product = (req, res) => {
    ProductModel.find()
        .then((result) => {
            res.send({ message: "success", product: result })
        })
        .catch((err) => {
            res.send({ message: "server err" })
        })
}

export const Like_Product = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;
    UserModel.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: "Liked Success " })
        })
        .catch(() => {
            res.send({ message: "server err" })
        })
}

export const Get_Like_Product = (req, res) => {
    UserModel.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            res.send({ message: "success", product: result.likedProducts })
        })
        .catch((err) => {
            res.send({ message: "server err" })
        })
}

export const Product_Detail = (req, res) => {
    ProductModel.findOne({ _id: req.params.id })
        .then((result) => {
            res.send({ message: "success", product: result })
        })
        .catch((err) => {
            res.send({ message: "server err" })
        })
}

export const search = (req, res) => {
    let search = req.query.search
    ProductModel.find({
        $or: [
            { pname: { $regex: search } },
            { pdesc: { $regex: search } },
            { pcate: { $regex: search } },
            { pprice: { $regex: search } }
        ]
    })
        .then((results) => {
            res.send({ message: "success", product: results })
        })
        .catch((err) => {
            res.send({ message: "server err" })
        })
}

export const Get_Products = (req, res) => {
    const catName = req.query.catName;
    let f = {};
    if (catName) {
        f = { pcate: catName }
    }
    ProductModel.find(f)
        .then((result) => {
            res.send({ message: "success", product: result })
        })
        .catch((err) => {
            res.send({ message: "server err" })
        })
}
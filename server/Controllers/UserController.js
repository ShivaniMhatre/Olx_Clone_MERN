import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import ProductModel from "../Models/ProductModel.js";

export const SignUp = async (req, res) => {
    try {
        // const { userData } = req.body
        const { username, password, email, mobile } = req.body.userData;
        if (!username || !password || !email || !mobile) return res.json({ success: false, message: "All fields are mandtory.." })

        const isEmailExist = await UserModel.find({ username: username })
        if (isEmailExist.length) {
            return res.json({
                success: false,
                message: "UserName is exist, try diffrent email."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            username,
            password: hashedPassword,
            email,
            mobile
        });

        await user.save();

        return res.json({
            success: true,
            message: "User registered Successfully.",
        })

    } catch (error) {
        return res.json({ success: false, message: error })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body.loginData;
        if (!email || !password) return res.json({ success: false, message: "All Fileds are required" })
        const user = await UserModel.findOne({ email })
        if (!user)
            return res.json({
                success: false,
                message: "User Not Found"
            })
        const isPassRight = await bcrypt.compare(password, user.password)
        if (isPassRight) {
            const userObj = {
                username: user.username,
                password: user.password,
                _id: user._id,
                email: user.email,
                mobile: user.mobile
            }
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' })

            return res.json({ success: true, message: "Login Successfull", userData: userObj, token: token, userId: user._id })
        }
        return res.json({ success: false, message: "password Is Wrong" })

    }
    catch (error) {
        return res.json({ success: false, message: error })
    }
}

export const User_Detail = (req, res) => {
    const userId = req.params.uId
    UserModel.findOne({ _id: userId })
        .then((result) => {
            res.send({ message: "Success", user: result })
        })
        .catch(() => {
            res.send({ message: "Server Err" })
        })
}

export const My_Products = (req, res) => {
    const userId = req.body.userId;

    ProductModel.find({ addedBy: userId })
        .then((result) => {
            res.send({ message: 'success', products: result })
        })
        .catch((err) => {
            res.send({ message: 'server err' })
        })
}

export const My_Profile = (req, res) => {
    UserModel.findOne({ _id: req.params.id})
        .then((result) => {
            res.send({
                message: "success...",
                user: {
                    email: result.email,
                    username: user.username,
                    mobile: user.mobile
                }
            })
        })
        .catch(()=>{
            res.send({message:'ser err'})
        })
} 
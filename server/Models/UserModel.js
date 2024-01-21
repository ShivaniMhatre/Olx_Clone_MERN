import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    likedProducts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }]
})

export default mongoose.model("User", userSchema)
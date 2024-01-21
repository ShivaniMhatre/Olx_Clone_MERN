import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    pname: {
        type: String
    },
    pdesc: {
        type: String
    },
    pcate:{
        type:String
    },
    pprice:{
        type:String
    },
    pimage:{
        type:String
    },
    pimage2:{
        type:String
    },
    addedBy:{
        type:mongoose.Schema.Types.ObjectId
    }
})



export default mongoose.model("Product", productSchema)
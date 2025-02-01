import { Schema } from "mongoose";
import mongoose from "mongoose";
const mettingSchema=new Schema({
    user_id:{
        type:String
    },
    meeting_code:{
        type:String, 
        required:true,
        
    },
    date:{type:Date , default:Date.now ,required:true}
})

const Metting=mongoose.model("Metting",mettingSchema)

export {Metting};
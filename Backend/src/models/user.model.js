import { Schema,mongoose } from "mongoose";

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    token:{                    //to be stroed in local storage
         type:String
    }
})

const User=mongoose.model("User",userSchema)
export { User };
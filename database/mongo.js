import mongoose, { model } from "mongoose";

const mongoosedta=mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true },
    password:{type:String,required:true,unique:true}
})


const User=mongoose.model("User",mongoosedta)
export default User

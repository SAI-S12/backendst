import User from "../database/mongo.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register=async(req,res)=>{
    const {username,email,password }=req.body
    try {
        const exituser=await User.findOne({email});
        if(exituser){
            return res.status(400).json({message:"useralreday exist "})
        }
      const hasgpassword=await bcrypt.hash(password,10);
      const member=new User({
        username,
        email,
        password:hasgpassword
      })
     await member.save();
      return res.send(200).json({message :"user register successfully"})
    } catch (error) {
         return res.status(500).json({message:"controller wrong check madarchod "})
    }
}

 const SECRETE_KEY="RUDHRA"
export const login=async(req,res)=>{
        const{email,password}=req.body
    try {
        const newuser=await User.findOne({email})
        if(!newuser){
            return res.status(400).json({message:"user not found mother fucker "});
        }
     const token =jwt.sign({email},SECRETE_KEY,{expiresIn:"1hr"})
     res.status(200).json({message:"loggged succcssfully mather fucker",token})
    } catch (error) {
        res.status(500).json({message:"look at try block madarchod"})
    }
}
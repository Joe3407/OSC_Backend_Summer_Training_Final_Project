import {Request , Response} from "express"
import mongoose from "mongoose" ;
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken" ; 
import { User } from "../models/usermodels";

export const register = async (req:Request , res :Response)=>{
   try{
    const {fullName , email , password , role} = req.body ;
    const existinguser = await User.findOne({ email })
    if(existinguser){
        return res.status(400).json({message :"user already exists"})
    }
    const hashedpassword = await bcrypt.hash(password ,10)
        const user = await User.create({
            fullName,
            email,
            password: hashedpassword,
            role
        });
        return res.status(201).json({message : "user created successfully" , user:{
            id : user._id,
            fullname : user.fullName ,
            email:user.email,
            role : user.role
        }})
    }
    catch(error){
     return res.status(500).json({message : "registration failed"})
    }
        
}

export const login = async (req : Request , res : Response)=>{
    try{
        const {email ,password} = req.body
        const user = await User.findOne({ email })
        if(!user){
              return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const passwordmatch = await bcrypt.compare(password , user.password)
        if(!passwordmatch){
              return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1d"
            }
        );
        return res.status(200).json({message  : "login successful" , token });
    } catch(error){
        return res.status(500).json({message: "login failed"});
    }
}
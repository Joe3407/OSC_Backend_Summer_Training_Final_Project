import {Request , Response} from "express"
import mongoose from "mongoose" ;
import { ClassSession } from "../models/classesmodels";

export const createclass = async (req : Request , res : Response)=>{
  try{
    const {title , trainer,  timeSlot , capacity} = req.body ;
    const newclass = await ClassSession.create({
        title ,
        trainer , 
        timeSlot ,
        capacity
    })
    return res.status(200).json({message : "class created successfully" , class : newclass} )
} 
catch(error){
    return res.status(500).json({message :  "failed to create class"})
}
}
export const deleteclass = async (req : Request , res : Response)=>{
    try{
        const id = req.params.id ;
     const classes = await ClassSession.findByIdAndDelete(id)
     if(!classes){
        return res.status(404).json({message : "class not found"})  
     }
     return res.status(200).json({message : "class deleted successfully"})
    }
    catch (error){
    return res.status(500).json({message :  "failed to delete class"})
    }
}

export const getclasses = async (req : Request , res : Response)=>{
    try{
     const classes = await ClassSession.find()
     return res.status(200).json(classes)
    }
    catch (error){
    return res.status(500).json({message :  "failed to get classes"})
    }
}

export const getclassbyid = async (req : Request , res : Response)=>{
    try{
        const id = req.params.id ;
     const classes = await ClassSession.findById(id)
     if(!classes){
        return res.status(404).json({message : "class not found"})  
     }
     return res.status(200).json(classes)
    }
    catch (error){
    return res.status(500).json({message :  "failed to get class"})
    }
}

export const updateclass = async (req : Request , res : Response) =>{
      try{
        const id = req.params.id ;
     const updatedclass = await ClassSession.findByIdAndUpdate(id , req.body , {new:true})
     if(!updatedclass){
        return res.status(404).json({message : "class not found"})  
     }
     return res.status(200).json({message :"class updated successfully" , classes : updatedclass})
    }
    catch (error){
    return res.status(500).json({message :  "failed to get class"})
    }
}

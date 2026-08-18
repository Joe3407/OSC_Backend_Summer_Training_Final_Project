import {Request , Response} from "express"
import mongoose from "mongoose" ;
import { Booking  } from "../models/bookingmodels";
import { ClassSession } from "../models/classesmodels";
import { CANCELLED } from "dns";

export const createbooking = async (req: Request , res : Response)=>{
    try {
    const {sessionid , memberid , status} = req.body ;
    const session = await ClassSession.findById(sessionid)
    if(!session){
        return res.status(404).json({message : "class session not found"})
    }
    const existingbooking = await Booking.findOne({

        session : sessionid,
        member:memberid,
        status : "booked"
    })
    if(existingbooking){
        return res.status(400).json({message : "class session is booked already"})
    }
    const bookingcount = await Booking.countDocuments({
        session : sessionid ,
        status : "booked"

    })
    if(bookingcount >= session.capacity){
        return res.status(400).json({message : "class session is fully booked"})
    }

    const booking = await Booking.create({
        session: sessionid,
        member: memberid,
        status: "booked"
    })

    return res.status(201).json(booking)
    } catch (error) {
        return res.status(500).json({message : "failed to create booking", error})
    }
}

export const cancelbooking = async (req : Request , res : Response)=>{
try{
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if(!booking){
        return res.status(404).json({message : "booking not found"})
    }
    booking.status = "cancelled"
    await booking.save();
    res.status(200).json({message:"booking cancelled successfully" , booking})
    
}
catch(error){
    res.status(500).json({message : "failed to cancel booking"})
}
}


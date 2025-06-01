import express from 'express'
import mongoose from 'mongoose'
import errorLogger from '../middlewares/ErrorLogger.js'
import User from '../models/User.js'


const UserRouter = express.Router()

UserRouter.post("/",async(req,res)=>{
    const {name,address, mobile} = req.body
    try {
        const existingUser = await User.findOne({mobile})

        if(existingUser){
            return res.status(400).json({message:'User already exists'})
        }
        const user = new User({
            name,
            address,
            mobile
        })
       await user.save()
       res.status(200).json({user})
    } catch (error) {
        errorLogger(error,req,res)
    }
})

UserRouter.get('/',async(req,res)=>{
    try {
        const totalClients = await User.countDocuments()
        return res.status(200).json({totalClients})
    } catch (error) {
        errorLogger(error,req,res)
    }
})
export default UserRouter
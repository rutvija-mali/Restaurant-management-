import express from 'express'
import mongoose from 'mongoose'
import errorLogger from '../middlewares/ErrorLogger.js'
import Chef from '../models/Chef.js'

const ChefRouter = express.Router()
ChefRouter.get('/',async(req,res)=>{
    try {
        const {name} = req.query
        let query = {}
        if(name){
            query.name = { $regex: name, $options: 'i' };
        }
        const chefs = await Chef.find(query)
        res.status(200).json(chefs)
    } catch (error) {
        errorLogger(error,req,res)
    }
})
export default ChefRouter
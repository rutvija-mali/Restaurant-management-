import express from 'express'
import mongoose from 'mongoose'
import errorLogger from '../middlewares/ErrorLogger.js'
import MenuItem from '../models/Menu.js'

const MenuRouter = express.Router()

MenuRouter.get('/',async(req,res)=>{
  try {
    const name = req.query.name || null
    const category = req.query.category || 'Burger'
    console.log('category received at backend'+category);
    

    const query = {}
    query.category = category
    if(name){
        query.name = { $regex: name, $options: 'i' }
    }

    const menu = await MenuItem.find(query)
    res.status(200).json(menu)
  } catch (error) {
    errorLogger(error,req,res)
  }
})

export default MenuRouter
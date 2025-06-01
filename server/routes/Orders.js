import express from 'express'
import mongoose from 'mongoose'
import errorLogger from '../middlewares/ErrorLogger.js'
import Order from '../models/Orders.js'
import Table from '../models/Table.js'
import Chef from '../models/Chef.js'

const generateOrderNo = async()=>{
    const count =  await Order.countDocuments()
    return `# ${String(count + 1).padStart(2,'0')}`
}

const assignedAndUpdateTable = async()=>{

    const availableTables = await Table.findOneAndUpdate(
        {status:'Available',isActive: true},{$set:{status:'Reserved'}},
        {new:true, sort: { name: 1 }}
    )
    console.log('available table ',availableTables);
    
    if(!availableTables){
        throw new Error('No tables available at the moment')

    }
    return availableTables._id
}

const assignChef = async ()=>{
    const availableChef = await Chef.findOne().sort({ currentOrders: 1 })
    availableChef.currentOrders += 1
    await availableChef.save()
    return availableChef._id
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const OrderRouter = express.Router()

OrderRouter.post('/',async(req,res)=>{
     let assignedTable = null
    let assignedChef = null
    try {
        const {
            customer,
            orderType,
            items,
            deliveryCharges,
            taxes,
            grandTotal,
            estimatedPrepTime,
            cookingInstructions
        } = req.body

        const orderNumber = await generateOrderNo();
        if(orderType === 'dine in'){
            try {
             assignedTable = await assignedAndUpdateTable()

            } catch (error) {
                return res.status(400).json({
                    message:error.message
                })
            }
        }

        try {
            assignedChef =  await assignChef()
        } catch (error) {
            await Table.findByIdAndUpdate(assignedTable,{status:'Available'})
            return res.status(400).json({message:error.message})
        }

        const newOrder = new Order({
            orderNumber,
            customer,
            orderType,
            items,
            assignedTable,
            assignedChef,
            deliveryCharges,
            taxes,
            grandTotal,
            estimatedPrepTime,
            cookingInstructions
        })
        await newOrder.save()

        res.status(201).json({message:'Order created successfully'})
    } catch (error) {
        
         if (assignedChef) {
            await Chef.findByIdAndUpdate(assignedChef, { $inc: { currentOrders: -1 } });
        }
        if (assignedTable) {
            await Table.findByIdAndUpdate(assignedTable, { status: 'Available' })
        }
         await Table.findByIdAndUpdate(assignedTable,{status:'Available'})
        errorLogger(error,req,res)
    }
})

OrderRouter.get('/',async(req,res)=>{
    try {
        const {name} = req.query
        let query = {}
        if(name){
            query.orderNumber = { $regex: name, $options: 'i' };
        }
        const orders = await Order.find(query).populate('assignedTable')
        res.status(200).json(orders)
    } catch (error) {
        errorLogger(error,req,res)
    }
})

OrderRouter.get('/get-revenue',async(req,res)=>{
    try {
        const result = await Order.aggregate([
            {
                $group:{
                    _id:null,
                    totalRevenue:{$sum:"$grandTotal"}
                }
            }
        ])

       const revenue = result[0]?.totalRevenue || 0
        res.status(200).json(revenue)
    } catch (error) {
        errorLogger(error,req,res)
    }
})

OrderRouter.get('/get-totalOrders',async(req,res)=>{
    try {
        const totalOrders = await Order.countDocuments()
        res.status(200).json(totalOrders)
    } catch (error) {
        errorLogger(error,req,res)
    }
})

OrderRouter.get('/order-summary',async(req,res)=>{
   try {
        const {start, end} = req.query
        
        let query = {}
        if(start && end){
            query.orderPlacedAt = {
                $gte: new Date(start),
                $lte: new Date(end)
            }
        }
        const dineInOrders = await Order.countDocuments({orderType:'dine in',...query})
        const takeAwayOrders = await Order.countDocuments({orderType:'take away', ...query})
        const totalServedOrders = await Order.countDocuments({status:'Served', ...query})
        const totalOrders = await Order.countDocuments({...query})
        res.status(200).json({dineInOrders,takeAwayOrders,totalServedOrders,totalOrders})
    } catch (error) {
        errorLogger(error,req,res)
    }

})

OrderRouter.get('/order-revenue',async(req,res)=>{
    try {
       const {start,end,range} = req.query 
       const startDate = new Date(start);
       const endDate = new Date(end);

       const matchStage={
        createdAt:{
            $gte:startDate,
            $lte:endDate
        }
       }
       
       let groupStage = {}
       let formatLabel;

       if(range === 'daily'){
         groupStage ={
          _id:{
            $dateToString:{format:"%Y-%m-%d",date:"$createdAt"}
          },
          totalRevenue:{$sum:"$grandTotal"}
        }

        formatLabel = (_id)=>{
            const date = new Date(_id)
            return weekdays[date.getDay()]
        }
       }else if(range === 'monthly'){
        groupStage = {
            _id:{
                $dateToString:{format:"%Y-%m",date:"$createdAt"}
            },
            totalRevenue:{$sum:"$grandTotal"}
        }

        formatLabel=(_id)=>{
            const [year, month] = _id.split("-")
            return months[parseInt(month)-1]
        }
       }else if(range === 'yearly'){
           groupStage ={
            _id:{$year:"$createdAt"},
            totalRevenue:{$sum:"$grandTotal"}
           }

           formatLabel=(_id)=>{
            return `${_id}`
           }
       }

       const result = await Order.aggregate([
        {$match:matchStage},
        {$group:groupStage},
        {$sort:{_id:1}}
       ])

       const formatedResult = result.map((item)=>({
        label:formatLabel(item._id),
        totalRevenue:item.totalRevenue
       }))

       res.status(200).json(formatedResult)
    } catch (error) {
        errorLogger(error,req,res)
    }
})

export default OrderRouter
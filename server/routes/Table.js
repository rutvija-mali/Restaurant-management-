import express from 'express'
import mongoose from 'mongoose'
import errorLogger from '../middlewares/ErrorLogger.js'
import Table from '../models/Table.js'

const TableRouter = express.Router()

TableRouter.post('/',async(req,res)=>{
    const {name, chairCount} = req.body
    console.log("backend reach")
    try {
      const table = new Table({
        name,
        chairCount
      })  
      await table.save()
      res.status(201).json(table)
    } catch (error) {
       errorLogger(error,req,res) 
    }
})

TableRouter.get('/',async(req,res)=>{
    const {name} = req.query
    try {
        let query ={}
       if (name) {
            const numberName = Number(name);
            if (!isNaN(numberName)) {
                query.name = numberName;
            }
        }
        const tables = await Table.find(query);
        res.status(200).json(tables)
    } catch (error) {
        errorLogger(error,req,res)
    }
})

TableRouter.delete('/:id',async(req,res)=>{
    try {
       const id = req.params.id 
       const existingTable = await Table.findById(id)
       
       if(!existingTable){
        return res.status(404).json({message:'Table not found'})
       }
       await Table.findByIdAndDelete(id)

       const deletedName = existingTable.name

       const tablesToUpdate = await Table.find({name:{$gt:deletedName}})

        for(const table of tablesToUpdate){
            table.name = table.name - 1;

            await table.save()

       }

       res.status(200).json({ message: 'Table deleted' });

    } catch (error) {
        errorLogger(error,req,res)
    }
})

export default TableRouter
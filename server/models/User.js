import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  mobile:{
    type:Number,
    required:true,
    unique:true
  },
  address:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})

export default mongoose.model('User',userSchema)
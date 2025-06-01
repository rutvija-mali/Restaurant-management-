import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    address: {
      type: String
    }
  },
  orderType: {
    type: String,
    enum: ['dine in', 'take away'],
    required: true
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
      },
      name:{
        type:String,
        required:true
      },
      qty: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      prepTime: {
        type: Number,
        required: true
      }
    }
  ],
  assignedTable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table'
  },
  assignedChef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef'
  },
  deliveryCharge: {
    type: Number,
    default: 0
  },
  taxes: {
    type: Number,
    default: 0
  },
  grandTotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Served', 'Not Picked Up'],
    default: 'Ongoing'
  },
  estimatedPrepTime: {
    type: Number
  },
  orderPlacedAt: {
    type: Date,
    default: Date.now
  },
  cookingInstructions: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', orderSchema);

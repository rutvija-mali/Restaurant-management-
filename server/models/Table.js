import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  name: {
    type: Number,
    required: true,
    unique: true
  },
  chairCount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Reserved'],
    default: 'Available'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Table', tableSchema);

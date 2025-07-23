import mongoose from 'mongoose';

const CustomOrderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  canvasSize: String,
  artType: String,
  color: {
    name: String,
    hex: String,
    rgb: String
  },
  textOnPainting: String,
  idea: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('CustomOrder', CustomOrderSchema);

import mongoose from 'mongoose';

const styleOrderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  styleName: String,
  size: String,
  quantity: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const StyleOrder = mongoose.model('StyleOrder', styleOrderSchema);

export default StyleOrder;

import mongoose from 'mongoose'

const OrderItemSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  quantity: Number,
})

const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  status: String,
  total: Number,
  items: [OrderItemSchema],
})

export default mongoose.model('Order', OrderSchema)
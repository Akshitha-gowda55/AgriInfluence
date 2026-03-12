import mongoose from 'mongoose'

const OrderItemSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
)

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: { type: String, required: true, default: 'PENDING' },
    total: { type: Number, required: true },
    items: [OrderItemSchema],
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', OrderSchema)

export default Order
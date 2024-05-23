import mongoose from "mongoose";
const Schema = mongoose.Schema;
//Generate random numbers for order
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);
const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    phone: { type: String, required: false },
    orderItems: [{ type: Object, required: true }],
    shippingAddress: { type: Object, required: false },
    orderNumber: { type: String, default: randomTxt + randomNumbers },

    //Hình thức thanh toán
    payments: { type: String, required: false },

    //VNPAY
    vnp_TxnRef: { type: Number },

    //for stripe payment
    paymentStatus: { type: String, default: "Not paid" },
    paymentMethod: { type: String, default: "Not specified" },
    totalPrice: { type: Number, default: 0 },
    currency: { type: String, default: "Not specified" },

    //For admin
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered"],
    },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

//compile to form model
const Order = mongoose.model("Order", OrderSchema);

export default Order;

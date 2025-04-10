import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    product_details: {
      name: String,
      image: Array,
    },
    paymentId: {
      type: String,
      default: "",
    },
    paymentStatus: {
      type: String,
      default: "",
    },
    delivery_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    subTotalAmt: {
      type: Number,
      default: 0,
    },
    TotalAmt: {
      type: Number,
      default: 0,
    },
    invoice_receipt: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);


const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;

import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address_line: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    pincode: {
      type: Number,
    },
    country: {
      type: String,
    },
    mobile: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const addressModel = mongoose.model("Address", addressSchema);
export default addressModel;

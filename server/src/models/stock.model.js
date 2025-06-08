import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    change: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.0,
    },
    unitPrice: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "suspended", "delisted"],
      default: "active",
    },
    sector: {
      type: String,
      enum: [
        "Finance",
        "Technology",
        "Agriculture",
        "Energy",
        "Manufacturing",
        "Other",
      ],
      default: "Other",
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);
export default Stock;

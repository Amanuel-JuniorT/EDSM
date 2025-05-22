import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  name:{
    type: String,
    unique: true,
    required: true
  },
  unitPrice:{
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  minAmount:{
    type: number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'delisted'],
    default: 'active'
  },
  sector: {
    type: String,
    enum: ['Finance', 'Technology', 'Agriculture', 'Energy', 'Manufacturing', 'Other'],
    default: 'Other'
  }
},
{timestamps: true}
);

const Stock = mongoose.model('Stock', stockSchema);
export default Stock;

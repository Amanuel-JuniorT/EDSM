import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    default: "User"
  },
  lastName: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    unique: true,
    default: null
  },
  nickname: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  kycStatus: {
    type: String,
    enum: ['not_started', 'pending', 'verified', 'rejected'],
    default: 'not_started'
  }
},
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
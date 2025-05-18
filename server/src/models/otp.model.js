import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ['verify_email', 'reset_password'],
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

const OTP = mongoose.model('Otp', otpSchema);

export default OTP;
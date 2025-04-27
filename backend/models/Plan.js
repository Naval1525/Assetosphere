import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  coverage: {
    type: String,
    required: true
  },
  terms: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Plan', planSchema); 
import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },
  deviceDetails: {
    type: String,
    required: true
  },
  issueDescription: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'approved', 'rejected'],
    default: 'pending'
  },
  claimDate: {
    type: Date,
    default: Date.now
  },
  documents: [{
    url: String,
    type: String
  }],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  }
}, {
  timestamps: true
});

const Claim = mongoose.model('Claim', claimSchema);

export default Claim; 
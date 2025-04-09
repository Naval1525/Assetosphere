import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  warrantyPeriodMonths: { type: Number, required: true },
  reminderBeforeExpiry: { type: Number, required: true },
  invoiceFileUrl: { type: String, required: true },
  storeName: { type: String },
  totalAmount: { type: Number },
  notes: { type: String }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bills: [billSchema]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

// models/Company.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the plan schema (similar to the SafeCover Warranty+ example)
const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  features: [{ type: String }],
  url: { type: String },
  active: { type: Boolean, default: true }
}, { timestamps: true });

// Company schema with basic info and profile completion fields
const companySchema = new mongoose.Schema({
  // Basic company info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },

  // Company profile fields
  logo: { type: String }, // URL to logo image
  website: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String }
  },
  industry: { type: String },
  companySize: { type: String }, // e.g., "1-10", "11-50", "51-200", etc.
  foundedYear: { type: Number },
  description: { type: String },

  // Social media links
  socialMedia: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String }
  },

  // Company contact information
  contactPerson: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },

  // Verification and status
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

  // Profile completion tracking
  profileCompletion: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },

  // Company plans (one company can have many plans)
  plans: [planSchema]
}, { timestamps: true });

// Calculate profile completion percentage before saving
companySchema.pre('save', function(next) {
  const company = this;
  let completionFields = 0;
  let totalFields = 0;

  // Basic info
  totalFields += 4; // name, email, password, phoneNumber
  if (company.name) completionFields++;
  if (company.email) completionFields++;
  if (company.password) completionFields++;
  if (company.phoneNumber) completionFields++;

  // Profile fields
  totalFields += 7; // logo, website, address, industry, companySize, foundedYear, description
  if (company.logo) completionFields++;
  if (company.website) completionFields++;
  if (company.address && company.address.street) completionFields++;
  if (company.industry) completionFields++;
  if (company.companySize) completionFields++;
  if (company.foundedYear) completionFields++;
  if (company.description) completionFields++;

  // Contact info
  totalFields += 3; // contactPerson, contactEmail, contactPhone
  if (company.contactPerson) completionFields++;
  if (company.contactEmail) completionFields++;
  if (company.contactPhone) completionFields++;

  // Calculate percentage
  company.profileCompletion = Math.round((completionFields / totalFields) * 100);

  next();
});

// Method to hash password
companySchema.methods.hashPassword = async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

// Method to verify password
companySchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Method to return company data without sensitive info
companySchema.methods.toJSON = function() {
  const companyObject = this.toObject();
  delete companyObject.password;
  return companyObject;
};

const Company = mongoose.model('Company', companySchema);

export default Company;
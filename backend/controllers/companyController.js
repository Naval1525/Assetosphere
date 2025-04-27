// controllers/companyController.js
import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';
import Plan from '../models/Plan.js';
import Purchase from '../models/Purchase.js';

const companyController = {
  // Register a new company
  async register(req, res) {
    try {
      const { name, email, password, phoneNumber } = req.body;

      // Check if company already exists
      let company = await Company.findOne({ email });
      if (company) {
        return res.status(400).json({ msg: 'Company already exists with this email' });
      }

      // Create new company instance
      company = new Company({
        name,
        email,
        password,
        phoneNumber
      });

      // Hash password
      await company.hashPassword();

      // Save company to database
      await company.save();

      // Create and return JWT token
      const token = generateToken(company._id);

      res.status(201).json({ token });
    } catch (err) {
      console.error('Register error:', err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Login company
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Check if company exists
      const company = await Company.findOne({ email });
      if (!company) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Check if company is active
      if (!company.isActive) {
        return res.status(403).json({ msg: 'Account has been deactivated' });
      }

      // Verify password
      const isMatch = await company.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Create and return JWT token
      const token = generateToken(company._id);

      res.json({ token });
    } catch (err) {
      console.error('Login error:', err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Get company profile
  async getProfile(req, res) {
    try {
      const company = await Company.findById(req.company.id);

      if (!company) {
        return res.status(404).json({ msg: 'Company not found' });
      }

      res.json(company);
    } catch (err) {
      console.error('Get profile error:', err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Update company profile
  async updateProfile(req, res) {
    try {
      const {
        name, website, logo, industry, companySize,
        foundedYear, description, contactPerson,
        contactEmail, contactPhone, address, socialMedia
      } = req.body;

      // Build profile object
      const profileFields = {};
      if (name) profileFields.name = name;
      if (website) profileFields.website = website;
      if (logo) profileFields.logo = logo;
      if (industry) profileFields.industry = industry;
      if (companySize) profileFields.companySize = companySize;
      if (foundedYear) profileFields.foundedYear = foundedYear;
      if (description) profileFields.description = description;
      if (contactPerson) profileFields.contactPerson = contactPerson;
      if (contactEmail) profileFields.contactEmail = contactEmail;
      if (contactPhone) profileFields.contactPhone = contactPhone;

      // Build address object
      if (address) {
        profileFields.address = {};
        if (address.street) profileFields.address.street = address.street;
        if (address.city) profileFields.address.city = address.city;
        if (address.state) profileFields.address.state = address.state;
        if (address.zipCode) profileFields.address.zipCode = address.zipCode;
        if (address.country) profileFields.address.country = address.country;
      }

      // Build social media object
      if (socialMedia) {
        profileFields.socialMedia = {};
        if (socialMedia.linkedin) profileFields.socialMedia.linkedin = socialMedia.linkedin;
        if (socialMedia.twitter) profileFields.socialMedia.twitter = socialMedia.twitter;
        if (socialMedia.facebook) profileFields.socialMedia.facebook = socialMedia.facebook;
        if (socialMedia.instagram) profileFields.socialMedia.instagram = socialMedia.instagram;
      }

      // Update company profile
      const company = await Company.findByIdAndUpdate(
        req.company.id,
        { $set: profileFields },
        { new: true }
      );

      res.json(company);
    } catch (err) {
      console.error('Update profile error:', err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Create a new plan
  async createPlan(req, res) {
    try {
      const { name, price, features, url } = req.body;

      const company = await Company.findById(req.company.id);

      if (!company) {
        return res.status(404).json({ msg: 'Company not found' });
      }

      // Create new plan
      const newPlan = {
        name,
        price,
        features,
        url
      };

      // Add plan to company
      company.plans.unshift(newPlan);
      await company.save();

      res.json(company.plans);
    } catch (err) {
      console.error('Create plan error:', err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Update a plan
  async updatePlan(req, res) {
    try {
      const { planId } = req.params;
      const { name, price, features, url, active } = req.body;

      const company = await Company.findById(req.company.id);

      if (!company) {
        return res.status(404).json({ msg: 'Company not found' });
      }

      // Find plan index
      const planIndex = company.plans.findIndex(plan => plan._id.toString() === planId);

      if (planIndex === -1) {
        return res.status(404).json({ msg: 'Plan not found' });
      }

      // Update plan fields
      if (name) company.plans[planIndex].name = name;
      if (price) company.plans[planIndex].price = price;
      if (features) company.plans[planIndex].features = features;
      if (url) company.plans[planIndex].url = url;
      if (active !== undefined) company.plans[planIndex].active = active;

      await company.save();

      res.json(company.plans);
    } catch (err) {
      console.error('Update plan error:', err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Delete a plan
  async deletePlan(req, res) {
    try {
      const { planId } = req.params;

      const company = await Company.findById(req.company.id);

      if (!company) {
        return res.status(404).json({ msg: 'Company not found' });
      }

      // Remove plan
      company.plans = company.plans.filter(plan => plan._id.toString() !== planId);

      await company.save();

      res.json(company.plans);
    } catch (err) {
      console.error('Delete plan error:', err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Get all insurance plans
  async getAllPlans(req, res) {
    try {
      // Find all companies and populate their plans
      const companies = await Company.find()
        .select('name _id')
        .populate('plans', 'name price features duration coverage terms active category');

      // Extract and format plans with company information
      const plans = companies.flatMap(company => 
        company.plans.map(plan => ({
          ...plan.toObject(),
          company: {
            _id: company._id,
            name: company.name
          }
        }))
      );

      res.json(plans);
    } catch (err) {
      console.error('Get all plans error:', err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Get company statistics
  async getCompanyStats(req, res) {
    try {
      const companyId = req.company._id;

      // Get total plans
      const totalPlans = await Plan.countDocuments({ company: companyId });
      
      // Get active plans
      const activePlans = await Plan.countDocuments({ 
        company: companyId,
        isActive: true 
      });

      // Get total users with active plans from this company
      const totalUsers = await Purchase.countDocuments({
        company: companyId,
        status: 'active'
      });

      // Calculate revenue (sum of all active plan prices)
      const activePurchases = await Purchase.find({
        company: companyId,
        status: 'active'
      }).populate('plan');

      const revenue = activePurchases.reduce((total, purchase) => {
        return total + (purchase.plan?.price || 0);
      }, 0);

      res.json({
        totalPlans,
        activePlans,
        totalUsers,
        revenue
      });
    } catch (error) {
      console.error('Error fetching company stats:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign(
    { company: { id } },
    process.env.JWT_SECRET,
    { expiresIn: '5d' }
  );
};

export default companyController;
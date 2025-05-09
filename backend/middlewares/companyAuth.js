// middleware/companyAuth.js
import jwt from 'jsonwebtoken';
import Company from '../
const companyAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add company from payload to request
    const company = await Company.findById(decoded.company.id);

    if (!company) {
      return res.status(401).json({ message: 'Token is valid but company not found' });
    }

    // Check if company account is active
    if (!company.isActive) {
      return res.status(403).json({ message: 'Account has been deactivated' });
    }

    // Add company to request object
    req.company = company;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default companyAuth;
  

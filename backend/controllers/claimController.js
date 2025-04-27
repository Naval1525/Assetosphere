import Claim from '../models/Claim.js';
import { validationResult } from 'express-validator';

// Get all claims
export const getClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate('user', 'name email phone')
      .populate('plan', 'name price duration')
      .sort({ createdAt: -1 });

    res.json(claims);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get a single claim
export const getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('plan', 'name price duration');

    if (!claim) {
      return res.status(404).json({ msg: 'Claim not found' });
    }

    res.json(claim);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update claim status
export const updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ msg: 'Claim not found' });
    }

    claim.status = status;
    await claim.save();

    res.json({ msg: 'Claim status updated successfully', claim });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create a new claim
export const createClaim = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newClaim = new Claim(req.body);
    const claim = await newClaim.save();
    res.status(201).json(claim);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
}; 
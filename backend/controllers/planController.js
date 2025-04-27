import Plan from '../models/Plan.js';
import { validationResult } from 'express-validator';

// Create a new plan
export const createPlan = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const plan = new Plan({
      ...req.body,
      company: req.company.id
    });

    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all plans
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ company: req.company.id });
    res.json(plans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get plan by ID
export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findOne({
      _id: req.params.id,
      company: req.company.id
    });

    if (!plan) {
      return res.status(404).json({ msg: 'Plan not found' });
    }

    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update plan
export const updatePlan = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const plan = await Plan.findOneAndUpdate(
      { _id: req.params.id, company: req.company.id },
      { $set: req.body },
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({ msg: 'Plan not found' });
    }

    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete plan
export const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findOneAndDelete({
      _id: req.params.id,
      company: req.company.id
    });

    if (!plan) {
      return res.status(404).json({ msg: 'Plan not found' });
    }

    res.json({ msg: 'Plan deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Toggle plan status
export const togglePlanStatus = async (req, res) => {
  try {
    const plan = await Plan.findOne({
      _id: req.params.id,
      company: req.company.id
    });

    if (!plan) {
      return res.status(404).json({ msg: 'Plan not found' });
    }

    plan.active = !plan.active;
    await plan.save();

    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
}; 
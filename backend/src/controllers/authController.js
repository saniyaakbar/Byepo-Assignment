import User from '../models/User.js';
import { ROLES } from '../config/constants.js';
import { sendTokenResponse } from '../utils/tokenUtils.js';
import { isValidObjectId } from '../utils/validation.js';

// Organization Admin: Signup
export const signup = async (req, res, next) => {
  try {
    const { email, password, organizationId } = req.body;

    if (!email || !password || !organizationId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, password, and organization ID',
      });
    }

    // Validate organizationId format
    if (!isValidObjectId(organizationId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid organization ID',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      role: ROLES.ADMIN,
      organizationId,
    });

    // Get fresh user without password
    const userWithoutPassword = await User.findById(user._id);

    sendTokenResponse(userWithoutPassword, 201, res);
  } catch (error) {
    next(error);
  }
};

// Organization Admin: Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check for user (need to select password field)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Only admins can use this endpoint
    if (user.role !== ROLES.ADMIN) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

import User from '../models/User.js';
import Organization from '../models/Organization.js';
import { ROLES } from '../config/constants.js';
import { sendTokenResponse } from '../utils/tokenUtils.js';
import { isValidObjectId } from '../utils/validation.js';

// Super Admin Only: Create Organization
export const createOrganization = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an organization name',
      });
    }

    const organization = await Organization.create({
      name,
    });

    res.status(201).json({
      success: true,
      data: organization,
    });
  } catch (error) {
    next(error);
  }
};

// Super Admin Only: List All Organizations
export const listOrganizations = async (req, res, next) => {
  try {
    const organizations = await Organization.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: organizations.length,
      data: organizations,
    });
  } catch (error) {
    next(error);
  }
};

// Super Admin Only: Check/Login (Static)
export const superAdminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check against hardcoded credentials
    if (
      email !== process.env.SUPERADMIN_EMAIL ||
      password !== process.env.SUPERADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Create a dummy superadmin user object for token generation
    const superAdminUser = {
      _id: 'superadmin-id',
      email: process.env.SUPERADMIN_EMAIL,
      role: ROLES.SUPERADMIN,
      organizationId: null,
    };

    sendTokenResponse(superAdminUser, 200, res);
  } catch (error) {
    next(error);
  }
};

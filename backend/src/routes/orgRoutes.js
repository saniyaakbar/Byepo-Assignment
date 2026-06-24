import express from 'express';
import {
  superAdminLogin,
  createOrganization,
  listOrganizations,
} from '../controllers/orgController.js';
import { protect, authorize } from '../middleware/auth.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

// Super Admin Login (Public - uses hardcoded credentials)
router.post('/login', superAdminLogin);

// Super Admin: Create Organization (Protected)
router.post('/create', protect, authorize(ROLES.SUPERADMIN), createOrganization);

// Super Admin: List All Organizations (Protected)
router.get('/list', protect, authorize(ROLES.SUPERADMIN), listOrganizations);

export default router;

import express from 'express';
import {
  createFeatureFlag,
  toggleFeatureFlag,
  listFeatureFlags,
  checkFeatureFlag,
} from '../controllers/featureFlagController.js';
import { protect, authorize } from '../middleware/auth.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

// End User: Check Feature Flag (Public - no auth required)
router.post('/check', checkFeatureFlag);

// Admin Routes (Protected)
router.post('/create', protect, authorize(ROLES.ADMIN), createFeatureFlag);
router.get('/list', protect, authorize(ROLES.ADMIN), listFeatureFlags);
router.put('/:flagId', protect, authorize(ROLES.ADMIN), toggleFeatureFlag);

export default router;

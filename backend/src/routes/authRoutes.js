import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Admin Signup
router.post('/signup', signup);

// Admin Login
router.post('/login', login);

export default router;

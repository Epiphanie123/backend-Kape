import { Router } from 'express';
import { registerUser, loginUser, requestPasswordReset, resetPassword } from '../controllers/usercontroller';

const router = Router();

// Route for registering a new user
router.post('/register', registerUser);

// Route for logging in a user
router.post('/login', loginUser);

// Route for requesting a password reset (sending OTP)
router.post('/send-otp', requestPasswordReset);

// Route for resetting the password using OTP
router.post('/reset-password', resetPassword);

export default router;
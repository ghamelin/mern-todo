import express from 'express';
const router = express.Router();
import {  register, auth,
  logout, getUserProfile, updateUserProfile
} from '../controllers/stytchAuthController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', register);
router.post('/auth', auth);
router.post('/logout', logout);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;

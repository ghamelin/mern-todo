import express from 'express';
const router = express.Router();
import {  register, auth,
  logoutUser,
  getUserProfile,
  updateUserProfile} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/register', register);
router.post('/auth', auth);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;

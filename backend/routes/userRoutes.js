import express from 'express';
const router = express.Router();
import {  register, auth,
  logoutUser,
  getUserProfile,
  updateUserProfile} from '../controllers/userController.js';

router.post('/register', register);
router.post('/auth', auth);
router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

export default router;

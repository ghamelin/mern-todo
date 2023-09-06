import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import * as stytch from 'stytch';

const client = new stytch.Client({
	project_id: 'project-test-dce7a2ed-b991-4202-b97c-839e047e6c28',
	secret: 'secret-test-5BrRaCvn9H7AE75dUj3pTlbd2K92fVJtpPA=',
	env: stytch.envs.test,
});

// @desc Register or Login a user
// @route POST /api/users
// @access Public
const register = asyncHandler(async (req, res) => {
	const email = req.body.email;
	const params = {
		email: email,
		login_magic_link_url: 'http://localhost:3000/auth',
		signup_magic_link_url: 'http://localhost:3000/auth',
	};
	const response = await client.magicLinks.email.loginOrCreate(params);
	res.json(response);
});

// @desc Set user credentials and Auth
// @route POST /api/users/auth
// @access Public
const auth = asyncHandler(async (req, res) => {
	try {
		const token = req.body.token;

		const params = {
			token: token,
			session_duration_minutes: 30,
		};
		const sessionToken = await client.magicLinks.authenticate(params);
		res.json(sessionToken);
	} catch (error) {
		res.status(401);
		throw new Error('Not authorized, invalid token', error);
	}
});

// @desc Logout a user
// @route POST /api/users/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
	res.clearCookie('stytchToken');
	res.json({ message: 'Logged out' });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		res.json({
			_id: user._id,
			email: user.email,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

const updateUserProfile = asyncHandler( async (req, res) => {
	const userId = req.user._id;
	const params = {
		name: {
			first_name: req.body.firstName,
			last_name: req.body.lastName,
		}
	}
		try {
			const response = await client.users.update(userId, params);
			res.json(response);
		} catch (error) {
			res.status(404);
      throw new Error('unable to update user profile');
		}
});

export { register, auth, logout, getUserProfile, updateUserProfile };

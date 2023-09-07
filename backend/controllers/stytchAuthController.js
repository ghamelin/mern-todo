import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import client from '../config/stytch.js';


// @desc Register or Login a user
// @route POST /api/users
// @access Public
const register = asyncHandler(async (req, res) => {
	const email = req.body.email;
	const params = {
		email: email,
		login_magic_link_url: process.env.MAGIC_LINK_URL,
		signup_magic_link_url: process.env.MAGIC_LINK_URL,
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

	const userId = req.user.user_id;
	const params = {
    user_id: userId,
}
	try {
		const user = await client.users.get(params)
		console.log('user:', user)
		if (user) {
			res.json({
				_id: user.user_id,
				email: user.emails[0].email,
				name: {
					firstName: user.name.first_name,
					lastName: user.name.last_name,
				},
			});
		} else {
			res.status(404);
			throw new Error('User not found');
		}
	} catch (error) {
		console.log(error);
		throw new Error('User not found:', error);
	}

});

const updateUserProfile = asyncHandler( async (req, res) => {
		
	const params = {
			user_id: req.user.user_id,
			name: {
				first_name: req.body.firstName,
				last_name: req.body.lastName,
			}
		}
		try {
			const response = await client.users.update(params);
			res.json(response);
		} catch (error) {
			res.status(404);
			
			console.error(error);
			throw new Error('User not found');
		}
});

export { register, auth, logout, getUserProfile, updateUserProfile};

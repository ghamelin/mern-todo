import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// Desc: User controller
// route POST /api/users/auth
// access Public
const auth = asyncHandler( async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


// Desc: Register a new user or login existing
// route POST /api/users
// access Public
const register = asyncHandler( async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  
  const user = await User.create({ 
    name, 
    email, 
    password 
  });

  if (user) { 
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Desc: Logout user
// route POST /api/users/logout
// access Public
const logoutUser = asyncHandler( async (req, res) => {
  res.cookie('jwt','', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: 'User logged out' });
});

// Desc: Get user Profile
// route GET /api/users/profile
// access Private
const getUserProfile = asyncHandler( async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).json(user);
});

// Desc: Update user Profile
// route PUT /api/users/profile
// access Private
const updateUserProfile = asyncHandler( async (req, res) => {
  const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password || user.password;
      }
    const updatedUser = await user.save();
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
});


export {
  auth,
  register,
  logoutUser,
  getUserProfile,
  updateUserProfile
}


///// stytch auth


// // Stytch client initialization
// const client = new stytch.Client({
//   project_id: process.env.STYTCH_PROJECT_ID, 
//   secret: process.env.STYTCH_SECRET,
//   env: stytch.envs.test
// });

// // Desc: User controller
// // route POST /api/users/auth
// // access Public
// const auth = asyncHandler( async (req, res) => {
//   res.status(200).json({ message: 'Auth user' });
// });

// // Desc: Register a new user or login existing user
// // route POST /api/users
// // access Public
// const login = asyncHandler( async (req, res) => {
//   const params = {
//     email: req.body.email,
//     login_magic_link_url: 'http://localhost:3000/auth',
//     signup_magic_link_url: 'http://localhost:3000/auth'
//   };
//   const response = await client.magicLinksemails.loginOrCreate(params)

  
// });

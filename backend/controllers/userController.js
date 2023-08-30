import asyncHandler from 'express-async-handler';



// Desc: User controller
// route POST /api/users/auth
// access Public
const auth = asyncHandler( async (req, res) => {
  res.status(200).json({ message: 'Auth user' });
});

// Desc: Register a new user or login existing
// route POST /api/users
// access Public
const login = asyncHandler( async (req, res) => {
  res.status(200).json({ message: 'Login or Register User' });
});

// Desc: Logout user
// route POST /api/users/logout
// access Public
const logoutUser = asyncHandler( async (req, res) => {
  res.status(200).json({ message: 'Logout User' });
});

// Desc: Get user Profile
// route GET /api/users/profile
// access Private
const getUserProfile = asyncHandler( async (req, res) => {
  res.status(200).json({ message: 'User Profile' });
});

// Desc: Update user Profile
// route PUT /api/users/profile
// access Private
const updateUserProfile = asyncHandler( async (req, res) => {
  res.status(200).json({ message: 'Update User' });
});


export {
  auth,
  login,
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

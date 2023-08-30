import asyncHandler from 'express-async-handler';

// Desc: User controller
// route Post /api/users/auth
// access Public

const authUser = asyncHandler( async (req, res) => {
  res.status(200).json({ message: 'Auth user' });
});

export {
  authUser
}
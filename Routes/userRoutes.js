const express = require('express');

const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  deleteUser,
  uploadProfile,
  signOut,
} = require('./../Controllers/userController');
const { isAuth } = require('./../Middlewares/jwtTokens');
const {
  validateUserSignUp,
  validateUserSignIn,
} = require('./../Validations/userValidation');

const multer = require('multer');

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('invalid image file!', false);
  }
};
const uploads = multer({ storage, fileFilter });

router.post('/create-user', validateUserSignUp, createUser);
router.post('/sign-in', validateUserSignIn,loginUser);
router.post('/sign-out', isAuth, signOut);
router.post(
  '/upload-profile',
  isAuth,
  uploads.single('profile'),
  uploadProfile
);

module.exports = router;
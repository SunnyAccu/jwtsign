const User = require('../Models/UserModel')
const { use } = require('../Routes/userRoutes')
const bcrypt = require('bcrypt')
const {
  createUser,
  isEmailExist,
  getUserByEmail,
  genratehash,
  comparePassword,
  getAllUsers,
  deleteUser,
  generateToken,
} = require('../Services/userServices')
const responseHelper = require('../utils/errorResponse')
const messageHelper = require('../utils/responseMessages')

exports.createUser = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body
    const emailExist = await isEmailExist(email)
    if (emailExist) {
      return responseHelper.badRequestError(
        res,
        messageHelper.registration.emailIdAlreadyExists,
      )
    }

    const hashPassword = await genratehash(password)

    const data = {
      fullname:fullname,
      email: email,
      password: hashPassword,
    }

    const user = await createUser(data)
    return responseHelper.success(res, messageHelper.registration.success)
  } catch (err) {
    next(err)
  }
}

exports.loginUser = async (req, res, next) => {
  try {
  
    const { email, password } = req.body
    const user = await getUserByEmail(email)
 

    if (!user) {
      return responseHelper.badRequestError(
        res,
        messageHelper.login.Loginfailed,
      )
    }
   

    const loginresult = comparePassword(password, user.password)
    const accesstoken=generateToken(user._id)

    if (loginresult) {
      return responseHelper.loginSuccess(res, messageHelper.login.success,accesstoken)
    } else {
      return responseHelper.badRequestError(
        res,
        messageHelper.login.Loginfailed,
      )
    }
  } catch (err) {
    next(err)
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await getAllUsers()

    return responseHelper.sucessRes(res, user)
  } catch (err) {
    next(err)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.query.id
    const user = await deleteUser(id)
    if (!user) {
      return responseHelper.notFound(messageHelper.user.UserNotFound)
    }
    return responseHelper.success(res, messageHelper.user.UserDeleted)
  } catch (err) {
    next(err)
  }
}

exports.uploadProfile = async (req, res) => {
  const { user } = req;
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: 'unauthorized access!' });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user._id}_profile`,
      width: 500,
      height: 500,
      crop: 'fill',
    });

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { avatar: result.url },
      { new: true }
    );
    res
      .status(201)
      .json({ success: true, message: 'Your profile has updated!' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'server error, try after some time' });
    console.log('Error while uploading profile image', error.message);
  }
};


exports.signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Authorization fail!' });
    }

    const tokens = req.user.tokens;
    

    const newTokens = tokens.filter(t => t.token !== token);
  

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: 'Sign out successfully!' });
  
  
  }
};

require('dotenv').config()
const User = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
exports.isEmailExist = async (email) => {
  return await User.findOne({ email: email })
}

exports.createUser = async (data) => {
  try {
    return await User.create(data)
  } catch (err) {
    return err
  }
}

exports.genratehash = async (data) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(data, salt)
}
exports.getUserByEmail = async (emailId) => {
  return await User.findOne({ email: emailId })
}

exports.comparePassword = async (passowrd, hash) => {
  return await bcrypt.compare(passowrd, hash)
}

exports.getAllUsers = async () => {
  return await User.find({})
}

exports.deleteUser = async (id) => {
  return await User.deleteOne({ _id: id })
}

exports.generateToken = (id) => {
  const token = jwt.sign({id},process.env.JWT_SECRET)
  return token
}

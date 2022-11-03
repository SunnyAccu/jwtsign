const { success } = require('./errorResponse')

module.exports = {
  registration: {
    emailIdAlreadyExists: 'email id alreay in use',
    success: 'User registered successfully',
  },
  login: {
    Loginfailed: 'Invalid login credentials',
    success: 'Login Sucessfull',
  },

  user: {
    UserNotFound: 'User not found',
    UserDeleted: 'User has been deleted successfully',
  },
}

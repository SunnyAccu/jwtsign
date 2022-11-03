const config = require('../config')

const success = (res, message, data = null) => {
  const response = {
    success: true,
    message,
  }
  if (data) response.data = data
  res.status(config.HTTP_STATUS_CODES.OK).send(response)
}

const sucessRes = (res, data) => {
  res.status(config.HTTP_STATUS_CODES.OK).send({
    success: true,
    data,
  })
}

const badRequestError = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.BAD_REQUEST).send({
    success: false,
    message,
  })
}

const notFound = (req, message) => {
  res.status(config.HTTP_STATUS_CODES.NOT_FOUND).send({
    success: false,
    message,
  })
}

const loginSuccess=(res,message,token)=>{
  res.status(config.HTTP_STATUS_CODES.OK).send({
    success:true,
    message,
    token,
  })
}

module.exports = {
  success,
  badRequestError,
  sucessRes,
  notFound,
  loginSuccess
}

const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
)

const connectDB = async () => {
  await mongoose.connect(DB, {
    useNewUrlParser: true,
  })
}

module.exports = connectDB

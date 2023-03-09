require('dotenv').config()

const PORT = 3001
const MONGODB_URI = 'mongodb+srv://admin-main:xEhTEO6Kv94514Ro@cluster0.wvgmz.mongodb.net/dailyBites'
  /*
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
*/
module.exports = {
  MONGODB_URI,
  PORT
}
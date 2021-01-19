require('dotenv').config();

module.exports = {
  PORT: 3001,
  MONGO_URL: (process.env.NODE_ENV !== 'production') ? 'mongodb://localhost:27017/mydiplomadb' : process.env.MONGO_URL,
  JWT_SECRET: (process.env.NODE_ENV !== 'production') ? 'JWT_SECRET' : process.env.JWT_SECRET,
};

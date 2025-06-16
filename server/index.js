require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const { DB_USER, DB_PASSWORD, DB_HOST, API_VERSION, IP_SERVER } = require('./constants');

const PORT = process.env.POST || 3977;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`);
    app.listen(PORT, () => {
      console.log('## API REST ##');
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    });
    console.log('Connection with DB is correct');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

connectDB();

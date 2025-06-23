require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

const { DB_USER, DB_PASSWORD, DB_HOST, API_VERSION, IP_SERVER } = require('./constants');

const PORT = process.env.PORT || 3977;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`);
    const server = app.listen(PORT, () => {
      console.log('## API REST ##');
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    });

    server.on('error', (error) => {
      console.error('Error starting server:', error);
    });

    console.log('Connection with DB is correct');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

connectDB();

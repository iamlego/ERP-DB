const app = require('./app');
const DB = require('./config/db');

const db = new DB();

// Connect to MongoDB
db.connectDB();
const PORT = db.port || 3000;
// const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} and features are from a new Branch`);
});


// const express = require('express');
// const DB = require('./config/db'); 
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const db = new DB();

// db.connectDB();

// const port = db.port;

// const server = app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// // Handle shutdown
// process.on('SIGTERM', () => { 
//   server.close(() => {
//     console.log('Process terminated');
//   });
// });

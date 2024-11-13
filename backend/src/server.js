const app = require('./app');
const DB = require('./config/db');

const db = new DB();

//testing the new github account

// Connect to MongoDB
db.connectDB();
const PORT = db.port || 3000;
// const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



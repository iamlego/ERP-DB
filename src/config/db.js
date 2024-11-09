// const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.MONGO_URI);
class DB {
  
  port = process.env.PORT;
  
  
  connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      process.exit(1);
    }
  };
}

const ins = new DB();
ins.connectDB();

module.exports = DB;




// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

// class DB {
//   constructor() {
//     this.port = process.env.PORT || 5000;
//   }

//   connectDB = async () => {
//     try {
//       await mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//       });
//       console.log('MongoDB connected successfully');
//     } catch (error) {
//       console.error('MongoDB connection failed:', error.message);
//       process.exit(1);
//     }
//   };
// }



// module.exports = DB;



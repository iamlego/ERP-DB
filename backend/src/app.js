const express = require('express');
const partsRoute = require('./routes/parts');
const customersRoute = require('./routes/customers');
const projectsRoute = require('./routes/projects');
const resourcesRoute = require('./routes/resources');
const panelsRoute = require('./routes/panels');
const submittalsRoute = require('./routes/submittals');
const billOfMaterialsRoute = require('./routes/billOfMaterials');
const masterBOMRoute = require('./routes/masterBOM');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use('/api/parts', partsRoute);
app.use('/api/customers', customersRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/resources', resourcesRoute);
app.use('/api/panels', panelsRoute);
app.use('/api/submittals', submittalsRoute);
app.use('/api/billOfMaterials', billOfMaterialsRoute);
app.use('/api/masterBOM', masterBOMRoute);

module.exports = app;


// src/app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const morgan = require('morgan');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json());

// // Routes




// // Database connection
// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch((error) => {
//     console.error('MongoDB connection error:', error);
//   });

// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// module.exports = app;

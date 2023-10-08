const path = require('path');

// Node modules
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnection = require('./database/mongodb')

const app = express();

// Routes
const router = require("./routes/router.js");

// Error controller
const error = require("./controller/error");

dotenv.config({ path: __dirname + '/config/.env' });

// Connect DB
dbConnection();

// Enable cors
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

// Add router for all routes
app.use("/api/v1", router);

// Catch 404 and forward to error handler
app.use(error.getPageNotFound);

app.listen(3000, () => {
    console.log('Server started to run');
});
const express = require('express');
const route = require('./route');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connectDB');
const chalk = require('chalk');
const app = express();

//config app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


route(app);

connectDB;

const port = process.env.PORT || 2000;
//Thay đổi
app.listen(port, () => {
   console.log(chalk.bold.cyan('Server running on http://localhost:' + port));
});

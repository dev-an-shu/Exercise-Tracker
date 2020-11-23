const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//Mongo DB Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully!");
});

//Routes for DB
const excerciseRouter = require('./route/excercise.js');
const usersRouter = require('./route/users.js');

app.use('/exercises', excerciseRouter);
app.use('/users', usersRouter);

try{
  app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})
}catch(error){
  console.log(error);
}
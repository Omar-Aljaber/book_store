require('dotenv').config();
const express = require('express');
const path = require('path');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect("mongodb://localhost:27070/bookstore");
      console.log("Connected to Mongo Successfully!");
    } catch (err) {
      console.log(err);
    }
};
connectToMongo();

module.exports = app;

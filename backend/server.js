const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
// Bring Routes
const blogRoutes = require('./routes/blog');

//app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connected'));

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use('/api', blogRoutes);

// Port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running of port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const routes = require('./routes')
const dotenv = require('dotenv')
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config()

app.use(cors());
app.use(bodyParser.json());
const User = require('./models/User');

// Connect to MongoDB
const connectToDb = async ()=>{
    try{
      await mongoose.connect(
          `mongodb+srv://Thanmai:${process.env.SECRET_KEY}@cluster0.6leylld.mongodb.net/?retryWrites=true&w=majority`,
          {
              useNewUrlParser: true,
              useUnifiedTopology: true,
          }   
      )
      console.log(("Connected to DB"))
    }
    catch(error){
      console.log(("Not connected due to"+error));
    }}
connectToDb();

app.use('/api',routes)
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

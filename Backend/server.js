const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const routes = require('./routes')
const dotenv = require('dotenv')
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
dotenv.config()
app.use(cors({origin:['http://localhost:3000','https://todo-application-010m.onrender.com'],credentials:true,methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'}));
app.use(cookieParser())
app.use(bodyParser.json());

const Database_URL = process.env.MONGODB_URL

// Connect to MongoDB
const connectToDb = async ()=>{
    try{
      await mongoose.connect(
          
          `${Database_URL}`,
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

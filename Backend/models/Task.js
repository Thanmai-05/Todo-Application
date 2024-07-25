const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
let TaskSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String ,
    description: String,
  });
  
  module.exports = mongoose.model('Task', TaskSchema);
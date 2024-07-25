const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
let TaskSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String ,
    description: String,
    status: {type:Boolean, default: false} ,
    date: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Task', TaskSchema);
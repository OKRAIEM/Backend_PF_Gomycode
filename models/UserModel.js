const mongoose = require('mongoose');

const userSchema = mongoose.Schema({   
  firstName: {
    type: String,    
    required: true,  
    trim: true,
  },

  lastName: {
    type: String,  
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    /*  enum:["Admin", "Student", "Instructor"], */
  },
  phone: {
    type: Number,
    required: true
  },
  photo: {
    type: String
  },
});

module.exports = mongoose.model('User', userSchema);

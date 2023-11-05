const { Schema, model } = require('mongoose');

const PasswordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Login', 'Application', 'Password', 'Secure Note', 'Other'],
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  createAta: {
    type: Date,
    default: Date.now,
  },
});

//Create a model using the schema
const Password = model('Password', PasswordSchema);

module.exports = Password;
const db = require('./connection');
const mongoose = require('mongoose');
const path = require('path');

// Adjust the module paths for models using path.join
const User = require(path.join(__dirname, '../models/User'));
const Password = require(path.join(__dirname, '../models/PassList'));

db.once('open', async () => {
  await Password.deleteMany();
  await User.deleteMany();

  const userData = await User.create([
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    },
    // Add more user objects as needed
  ]);
  console.log('users seeded');

  const passwordData = await Password.create([
    {
      name: 'Website Login',
      category: 'Login',
      email: 'johndoe@example.com', // Associate with a user
      username: 'johndoe',
      password: 'password123',
    },
  ]);
  console.log('password seeded');
  // Add more password objects as needed
  process.exit();
});

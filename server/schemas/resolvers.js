const bcrypt = require('bcrypt');
const { User, Password } = require('../models');

// Create Password Logic
const createPassword = async (input) => {
  const { name, category, email, username, password, notes } = input;
  const saltRounds = 10; // Number of salt rounds for bcrypt

  try {
    // Hash the provided plaintext password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new Password document with the hashed password
    const newPassword = new Password({
      name,
      category,
      email,
      username,
      password: hashedPassword, // Store the hashed password in the database
      notes,
    });

    // Save the new password to the database
    await newPassword.save();

    return { success: true, message: 'Password created successfully' };
  } catch (error) {
    console.error('Error creating password:', error);
    return { success: false, message: 'Password creation failed' };
  }
};

const resolvers = {
  Query: {
    getUserById: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        throw new Error('Failed to fetch user by ID');
      }
    },
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('Failed to fetch all users');
      }
    },
    getPasswordById: async (_, { passwordId }) => {
      try {
        const password = await Password.findById(passwordId);
        return password;
      } catch (error) {
        throw new Error('Failed to fetch password by ID');
      }
    },
    getAllPasswords: async () => {
      try {
        const passwords = await Password.find();
        return passwords;
      } catch (error) {
        throw new Error('Failed to fetch all passwords');
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const user = await User.create(input);
        return user;
      } catch (error) {
        if (error.name === 'ValidationError') {
          // Handle validation errors (e.g., required fields missing)
          const validationErrors = Object.values(error.errors).map((error) => error.message);
          throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
        }
        // Handle other errors
        throw new Error('Failed to create user');
      }
    },
    updateUser: async (_, { userId, input }) => {
      try {
        const user = await User.findByIdAndUpdate(userId, input, { new: true });
        return user;
      } catch (error) {
        throw new Error('Failed to update user');
      }
    },
    deleteUser: async (_, { userId }) => {
      try {
        const user = await User.findByIdAndDelete(userId);
        return user;
      } catch (error) {
        throw new Error('Failed to delete user');
      }
    },
    createPassword: async (_, { input }) => {
      const { name, category, email, username, password, notes } = input;
      const saltRounds = 10; // Number of salt rounds for bcrypt

      try {
        // Hash the provided plaintext password
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Create a new Password document with the hashed password
        const newPassword = new Password({
            name,
            category,
            email,
            username,
            password: hashedPassword, // Store the hashed password in the database
            notes,
          });

          // Save the new password to the database
          const savedPassword = await newPassword.save()

          // Return the saved password data, including the 'name' field
          return savedPassword;
        } catch (error) {
          console.error('Error creating password:', error);
          return { success: false, message: 'Password creation failed' };
        }
      },
      updatePassword: async (_, { passwordId, input }) => {
        try {
          const password = await Password.findByIdAndUpdate(passwordId, input, { new: true });
          return password;
        } catch (error) {
          throw new Error('Failed to update password');
        }
      },
      deletePassword: async (_, { passwordId }) => {
        try {
          const password = await Password.findByIdAndDelete(passwordId);
          return password;
        } catch (error) {
          throw new Error('Failed to delete password');
        }
      },
    },
};

module.exports = resolvers;

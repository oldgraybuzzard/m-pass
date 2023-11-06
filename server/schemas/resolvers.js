const { User, Password } = require('../models'); 

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
      try {
        const password = await Password.create(input);
        return password;
      } catch (error) {
        throw new Error('Failed to create password');
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

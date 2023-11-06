const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Password {
    _id: ID!
    name: String!
    category: String!
    email: String!
    username: String!
    password: String!
    notes: String
    createdAt: String!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  input PasswordInput {
    name: String!
    category: String!
    email: String!
    username: String!
    password: String!
    notes: String
  }

  type Query {
    getUserById(userId: ID!): User
    getAllUsers: [User]
    getPasswordById(passwordId: ID!): Password
    getAllPasswords: [Password]
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(userId: ID!, input: UserInput): User
    deleteUser(userId: ID!): User
    createPassword(input: PasswordInput): Password
    updatePassword(passwordId: ID!, input: PasswordInput): Password
    deletePassword(passwordId: ID!): Password
  }
`;

module.exports = typeDefs;

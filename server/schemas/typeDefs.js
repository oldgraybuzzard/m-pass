const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!): User
    updateUser(id: ID!, firstName: String, lastName: String, email: String): User
    deleteUser(id: ID!): User
  }
`;

module.exports = typeDefs;

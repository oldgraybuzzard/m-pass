import { gql } from '@apollo/client';

// Query to get passwords
export const GET_PASSWORDS = gql`
  query {
    passwords {
      name
      category
      email
      username
      password
    }
  }
`;

// Mutation to create a new password
export const CREATE_PASSWORD = gql`
  mutation AddPassword($user: String!, $website: String!, $password: String!) {
    addPassword(user: $user, website: $website, password: $password) {
      name
      category
      email
      username
      password
    }
  }
`;

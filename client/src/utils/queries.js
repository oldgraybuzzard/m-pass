import { gql } from '@apollo/client';

export const GET_USER_DETAILS = gql`
  query GetUserDetails($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      // ... other user fields
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    userProfile(userId: $userId) {
      id
      firstName
      lastName
      email
      // ... additional profile fields
    }
  }
`;

export const GET_APPLICATION_SETTINGS = gql`
  query GetApplicationSettings {
    settings {
      theme
      notificationsEnabled
      // ... other settings
    }
  }
`;

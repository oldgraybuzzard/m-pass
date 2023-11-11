import { useReducer } from "react";

// Define action types (GET_PASSWORDS and CREATE_PASSWORD)
export const GET_PASSWORDS = "GET_PASSWORDS";
export const CREATE_PASSWORD = "CREATE_PASSWORD";

// Define the initial state
const initialState = {
  passwords: [], // You can initialize this with your default data if needed
};

// Create the reducer function
export const reducer = (state, action) => {
  switch (action.type) {
    case GET_PASSWORDS:
      // You can implement the logic to fetch passwords here and update the state
      return {
        ...state,
        passwords: action.payload, // Update passwords with fetched data
      };
    case CREATE_PASSWORD:
      // You can implement the logic to add a password here and update the state
      return {
        ...state,
        passwords: [...state.passwords, action.payload], // Add a new password to the list
      };
    default:
      return state;
  }
};

// Create a custom hook for using the reducer
export function usePasswordReducer() {
  return useReducer(reducer, initialState);
}
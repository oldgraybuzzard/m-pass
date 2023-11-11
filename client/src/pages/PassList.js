import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_PASSWORDS, CREATE_PASSWORD } from '../utils/mutations';

function PassList() {
  const { loading, error, data } = useQuery(GET_PASSWORDS);
  const [createPassword] = useMutation(CREATE_PASSWORD);
  const [name, setName] = useState(null); // Define user state
  const [newPassword, setNewPassword] = useState(''); // Define newPassword state
  const [passwords, setPasswords] = useState([]); // Define passwords state

  // Fetch user data from your server
  useEffect(() => {
    fetch('/api/user')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((userData) => {
        // Update the user state with the fetched data
        setUser(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        // Handle errors here, such as redirecting to a login page or displaying an error message
      });
  }, []);


  useEffect(() => {
    if (!loading && !error) {
      // Data is available after the query has successfully completed
      const passwordData = data.passwords;

      // Update the passwords state with the fetched data
      setPasswords(passwordData);
    }
  }, [data, loading, error]);

  const maskPassword = (password) => {
    // Implement password masking logic here
    return '****'; // Replace with your masking logic
  };

  const handleAddPassword = () => {
    // Create a new password object and add it to the passwords state
    const newPasswordObject = {
      user: user.name, // Replace with the actual user information
      website: 'Example Website', // Replace with the website/application name
      password: newPassword,
    };

    // You should also send the new password to your server using the `createPassword` mutation
    createPassword({
      variables: {
        username: newPasswordObject.username,
        name: newPasswordObject.name,
        password: newPasswordObject.password,
        category: newPasswordObject.category,
        email: newPasswordObject.email,
      },
    });

    // Update the passwords state with the new password
    setPasswords([...passwords, newPasswordObject]);

    // Clear the newPassword input field
    setNewPassword('');
  };

  return (
    <div>
      <h1>Password List</h1>
      <div>
        {/* Input field for adding a new password */}
        <input
          type="text"
          placeholder="Enter a new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleAddPassword}>Add Password</button>
      </div>

      {/* Display the list of passwords */}
      {passwords.map((password, index) => (
        <div key={index}>
          <p>User: {password.user}</p>
          <p>Application/Website: {password.website}</p>
          <p>Masked Password: {maskPassword(password.password)}</p>
          {/* Display previous passwords here */}
        </div>
      ))}
    </div>
  );
}

export default PassList;
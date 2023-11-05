import React, { useEffect, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const msalConfig = {
  auth: {
    clientId: 'ea48be00-4342-4789-9162-641dd9be4009',
    authority: 'https://login.microsoftonline.com/281950d2-3875-419e-8017-cf5cf823f049',
    redirectUri: window.location.origin,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // State to store user profile

  const handleLogin = async (e) => {
    e.preventDefault();
    
    //Send a POST request to Azure for authentication. This is what will need to be changed if used for anyone other then Melken Solutions  
    try {
      const loginRequest = {
        scopes: ['user.read', 'openid', 'profile'],
      };
  
      const response = await msalInstance.loginPopup(loginRequest);
      if (response && response.account) {
        setUserProfile(response.account);
        setLoggedIn(true);
        
        // Create an object with user information to send to the server
        const userInfo = {
          name: response.account.name,
          email: response.account.userName, // Use the appropriate property for the email
          // Add other user properties as needed
        };

        // Make an HTTP request to your server to send user information
        fetch('/api/update-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('User information sent to server:', data);
          })
          .catch((error) => {
            console.error('Error sending user information:', error);
          });
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred during Azure AD authentication. Please try again later.");
    }
  };

   const handleGoToPasswordList = () => {
    // Implement navigation to the password list page here
  };

  useEffect(() => {
    async function initializeMsal() {
      try {
        // Initialize MSAL instance
        await msalInstance.handleRedirectPromise();
        console.log("MSAL initialized");
      } catch (error) {
        console.log("MSAL initialization error:", error);
      }
    }

    initializeMsal();
  }, []);

  return (
    <div>
      <div className="login-container">
        <h1>M-PASS</h1>
        <h3>Melken Solutions Employee Password Manager</h3>
        {loggedIn ? (
          <div>
            <Alert variant="success">{userProfile ? `Welcome, ${userProfile.name}! You have successufully logged in!` : 'You have successufully logged in!'}</Alert>
            <Button variant="primary" onClick={handleGoToPasswordList}>
                Go to Password Your List
            </Button>
          </div>
        ) : (
          <div>
            <Button variant="secondary" size="lg" onClick={handleLogin}>
              Employee Login
            </Button>
          </div>  
        )}
      </div>
    </div>
  );
}

export default Login;

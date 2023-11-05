import React, { useEffect, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";


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

  const handleLogin = async (e) => {
    e.preventDefault();
    
    //Send a POST request to Azure for authentication  
    try {
      const loginRequest = {
        scopes: ['user.read', 'openid', 'profile'],
      };
  
      const response = await msalInstance.loginPopup(loginRequest);
      if (response && response.account) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred during Azure AD authentication. Please try again later.");
    }
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
  }, []); // Ensure this effect runs only once on component mount

  return (
    <div className="login-container">
      {loggedIn ? (
        <p>You are logged in!</p>
      ) : (
        <div>
          <button onClick={handleLogin}>
            Employee Login
          </button>
        </div>  
      )}
    </div>
  );
}

export default Login;

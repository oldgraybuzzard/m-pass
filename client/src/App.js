
import './App.css';
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PublicClientApplication } from "@azure/msal-browser";
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import PassList from './pages/PassList';

const msalConfig = {
  auth: {
    clientId: 'ea48be00-4342-4789-9162-641dd9be4009',
    authority: 'https://login.microsoftonline.com/281950d2-3875-419e-8017-cf5cf823f049',
    redirectUri: window.location.origin,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
await msalInstance.initialize();
  
function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // State to store user profile
  const [termsAccepted, setTermsAccepted] = useState(false);

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

    const handleLogout = async () => {
    // You can add any necessary logic to clear user session or perform logout actions here.
    // For example, if you're using MSAL for authentication, you can call its logout method.
    try {
      await msalInstance.logout();
      setUserProfile(null); // Clear the user profile state
      setLoggedIn(false); // Set the logged-in state to false
    } catch (error) {
      console.log("Logout error:", error);
      // Handle any error that occurs during logout.
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
  }, []);

  return (
    <Router>
      <Header
        userProfile={userProfile}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        termsAccepted={termsAccepted}
      />
      <Switch>
        <Route exact path="/" 
          component={() => (
            <Login
              handleLogin={handleLogin}
              loggedIn={loggedIn}
              termsAccepted={termsAccepted}
            />
          )}
        />
        <Route path="/passlist" component={PassList} /> {/* Add this route */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

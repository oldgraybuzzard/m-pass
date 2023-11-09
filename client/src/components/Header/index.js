import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from'react-bootstrap/Button';

function Header({ userProfile, handleLogin, handleLogout }) {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {userProfile ? (
            <div>
              <Navbar.Text>
                Signed in as: <a>{userProfile.name}   </a>
              </Navbar.Text>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="secondary" size="sm" onClick={handleLogin}>
              Employee Login
            </Button>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

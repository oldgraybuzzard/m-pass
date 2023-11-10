import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Header({ userProfile, handleLogin, handleLogout, termsAccepted }) {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">M-PASS</Navbar.Brand>
        <Navbar.Toggle />
                <Navbar.Text>
                  <p>Signed in as: {userProfile ? userProfile.name : "Not signed in"}</p>
                </Navbar.Text>
                {userProfile ? (
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
            ) : (
              <Button variant="danger" size="sm" onClick={handleLogin} disabled={!termsAccepted}>
                You Must Log In
              </Button>
            )}
      </Container>
    </Navbar>
  );
}

export default Header;

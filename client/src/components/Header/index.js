import React, { useState} from "react";
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Navbar>
      <Container>
        <Nav.Link href="#home">Home</Nav.Link>

      </Container>
    </Navbar>

  );
};

export default Header;
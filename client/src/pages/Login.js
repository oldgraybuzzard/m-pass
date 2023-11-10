import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/esm/Container";
import { useHistory } from 'react-router-dom';

function Login({ handleLogin, loggedIn, termsAccepted, userProfile }) {
  const [acceptTerms, setAcceptTerms] = useState(false);

const handleGoToPasswordList = () => {
  try {
    // Use the `history` object to navigate to the PassList component
    history.push('/passlist'); // Replace '/passlist' with the actual route path of PassList
  } catch (error) {
    console.log("Unable to fetch Password List page");
  }
};

const history = useHistory();

  return (
    <div>
      <Row className="login-container">
        <Col md={{ span: 4, offset: 4 }}>
          <h3>Melken Solutions Employee Password Manager</h3>
        </Col>

      </Row>
      <div>  
      <Modal.Dialog className="modal show"
      style={{ display: 'block', position: 'initial', size: 'xl' }}>
        <Modal.Header>
          <h3>
            Terms and Condition
          </h3>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>
              YOU ARE ACCESSING A MELKEN SOLUTIONS INFORMATION MANAGEMENT SYSTEM.
            </strong>
          </p>
          <p>
            This software is for the official use of Melken Solutions. Users have no explicit or implicit expectation of privacy. By clicking on the "I Accept The Terms and Conditions" button below and logging into this Melken Solutions software tool, you agree to abide by the terms of the Melken IT and Electronic Communications Policy. Users are responsible for ensuring that they act in accordance with this policy and other policies and legislation applicable to Melken Solutions. Unauthorized or improper use of this system may result in administrative disciplinary action, civil and criminal penalties.
          </p> 
          <p>
            By continuing to use this tool you indicate your awareness of and consent to these terms and conditions of use.
          </p>
          <p>
            <strong>STOP IMMEDIATELY!!!</strong> if you do not agree to the conditions stated in this warning.
          </p>
        </Modal.Body>
      </Modal.Dialog>
      {loggedIn ? (
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Alert variant="success">
              {userProfile ? `Welcome, ${userProfile.name}! You have successfully logged in!` : 'You have successfully logged in!'}
            </Alert>
            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <Button variant="primary" onClick={handleGoToPasswordList}>
                    Go to Your Passwords
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        ) : (
        <Container className="justify-content-xl-center">
          <Row>
            <Col  md={{ span: 4, offset: 4 }}>

          
          <label>
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={() => setAcceptTerms(!acceptTerms)}
            />
              I accept the terms and conditions
            </label>
            <button
              variant="secondary"
              size="lg"
              onClick={handleLogin}
              disabled={!acceptTerms} // Disable login button until terms are accepted
            >
              Employee Login
            </button>
            </Col>
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}

export default Login;

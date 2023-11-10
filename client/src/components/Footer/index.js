import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <Container>
      <Row>
        <Col md={{ span: 10, offset: 10 }}>
          <p>
            Melken Solutions, LLC
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
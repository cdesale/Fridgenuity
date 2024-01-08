import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap"; // Assuming you've imported these components
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { UserContext } from "./UserContext";

const Footer = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  if (user === null) {
    return <></>;
  }

  const onLogoutClick = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container fluid="md">
        <Row
          style={{
            border: "5px solid #B522E1",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Col xs={1} />
          <Col xs={5}>
            <h1>Get Gramming📸</h1>
          </Col>
          <Col xs={4} />
          <Col
            xs={1}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                backgroundColor: "#1982DE",
                color: "white",
                borderRadius: "70px",
              }}
              onClick={onLogoutClick}
            >
              Logout
            </Button>
          </Col>
          <Col xs={1} />
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

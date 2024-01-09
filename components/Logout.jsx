import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap"; // Assuming you've imported these components
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { UserContext } from "./UserContext";

const Logout = () => {
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
    <footer className="footer mt-auto py-3" >
      <Container fluid="md" style={{color: "white"}}>
        
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
      
          </Container>
    </footer>
  );
};

export default Logout;

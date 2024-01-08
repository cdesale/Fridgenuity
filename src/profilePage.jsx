import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RestaurantCard } from "../components/RestaurantCard";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Container fluid="md">
        <Row style={{ marginTop: "30px" }}>
          <Col xs={1} />
          <Col xs={10}>
            {user && (
              <>
                Hello {user.userName}, welcome to your grammable location page!
              </>
            )}

            {!user && (
              <Link to={"/"}>
                Please login/register to create your profile page
              </Link>
            )}
          </Col>
          <Col xs={1} />
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;

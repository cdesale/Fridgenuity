import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PostedCard } from "../components/PostedCard";
import { getRestaurantsByUserId, deleteRestaurantById } from "../utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import FancyBox from "../components/FancyBox";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const [restaurants, setRestaurants] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);
  const id = user ? user.userId : null;
  const name = user ? user.userName : null;

  const fetchRestaurants = (id) => {
    setIsLoading(true);
    setError("");

    getRestaurantsByUserId(id)
      .then(({ data }) => {
        setRestaurants(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 404) {
          setError("User not found.");
        } else if (error.response.status === 400) {
          setError("User has not posted any restaurants.");
        } else {
          setError("Error fetching restaurants by userid");
        }
        console.error("Error fetching restaurants by userid:", error);
      });
  };

  const deleteRestaurant = (restaurantId) => {
    setError("");

    deleteRestaurantById(restaurantId, user.token)
      .then(() => {
        fetchRestaurants(id);
      })
      .catch((error) => {
        setError("Error deleting restaurant");
        console.error("Error deleting restaurant", error);
      });
  };

  useEffect(() => {
    if (id === null) {
      setError("Please register to create your profile!");
    } else {
      fetchRestaurants(id);
    }
  }, []);

  return (
    <>
      <Container fluid="md">
        <Row style={{ marginTop: "30px", minHeight: "50vh", border: "white" }}>
          <Col xs={1} />
          <Col xs={10}>
            <h2>Welcome{user && `, ${name}`}! </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px",
              }}
            >
              <Link to={"/restaurants"}>Homepage</Link>
              {!user && <Link to={"/"}>login/register</Link>}
              {user && (
                <Link to="/form">
                  <p>Post a new restaurant</p>
                </Link>
              )}
            </div>

            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div>
                {restaurants ? (
                  <Row style={{ border: "white" }}>
                    {restaurants.map((restaurant, index) => (
                      <Col md={6} key={index}>
                        <FancyBox>
                          {" "}
                          <PostedCard
                            restaurant={restaurant}
                            deleteRestaurant={deleteRestaurant}
                          />
                        </FancyBox>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No restaurants found</p>
                )}
              </div>
            )}
          </Col>
          <Col xs={1} />
        </Row>
      </Container>
    </>
  );
};
export default ProfilePage;

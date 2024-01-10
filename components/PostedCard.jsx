import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../assets/PostedCard.css';
export const PostedCard = (props) => {
  const { restaurant, deleteRestaurant } = props;
  const postedRestaurantId = restaurant.id;

  const navigate = useNavigate();
  const navigateToForm = () => {
    navigate("/form", { state: { postedRestaurantId } });
  };

  const handleIconClick = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`;
    window.open(mapUrl, "_blank");
  };
  return (
    <Card className="posted-card" >
      <div
        onClick={handleIconClick}
        style={{ height: "30px", width: "30px", cursor: "pointer" }}
      >
        <img
          src="../assets/map.png"
          style={{ maxWidth: "30px" }}
          alt="Map Icon"
        />
      </div>
      <Card.Body>
        <Card.Title>
          <strong>Restaurant Name: </strong>
          {restaurant.name}
        </Card.Title>

        <Card.Text className="cuisine">
          <strong>Cuisine type: </strong>
          {restaurant.cuisine}
        </Card.Text>

        <Card.Text>
          <strong>Address: </strong>
          {restaurant.address}
        </Card.Text>
        <img
          src={restaurant.photosUrl}
          className="card-img-top"
          alt={`Photo of ${restaurant.name}`}
        />
      </Card.Body>
      <div className="button-container">
        <Button onClick={navigateToForm}  className="edit-button">
          <img
            src="../assets/edit.png"
            alt="edit"
            style={{
              width: "20px",
              backgroundColor: "#47A0F9",
              borderRadius: "20px",
              color: "#47A0F9",
              border:"#47A0F9"
            }}
          />
        </Button>
        <Button onClick={() => deleteRestaurant(restaurant.id)} className="delete-button">
          <img
            src="../assets/delete.png"
            alt="delete"
            style={{
              width: "20px",
              backgroundColor: "#47A0F9",
              borderRadius: "20px",
              color: "#47A0F9",
              border:"#47A0F9"
            }}
          />
        </Button>
      </div>
    </Card>
  );
};

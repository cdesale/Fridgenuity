import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export const RestaurantCard = (props) => {
  const { restaurant } = props;

  return (
    <Container>
      <Row className="justify-content-md-center">
      <Col xs={12} sm={10} md={8}>
          <Card>
            <Card.Body>
              <Card.Title>
                <strong>Restaurant Name: </strong>
                {restaurant.name}
              </Card.Title>
              <Card.Text>
                <strong>Description:</strong> {restaurant.description}
              </Card.Text>
              <Card.Text>
                <strong>Cuisine type: </strong>
                {restaurant.cuisines}
              </Card.Text>
              <Card.Text>
                <strong>Address: </strong>
                {restaurant.address}, {restaurant.city}
              </Card.Text>
              <img
                src={restaurant.photosUrl}
                className="card-img-top"
                alt={`Photo of ${restaurant.name}`}
                style={{ maxWidth: '80%', maxHeight: '300px' }} 
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';


export const RestaurantCard = (props) => {
  const { restaurant } = props;

  return (
    <Container >
      <Row className="justify-content-md-center"  style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
        <Col xs={12} sm={10} md={8}>

          <Card style={{ border: '0' }}>
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
                {restaurant.cuisine}
              </Card.Text>
              <Card.Text>
                <strong>Address: </strong>
                {restaurant.address}
              </Card.Text>
              <Card.Text>
                <strong>City: </strong>
                {restaurant.city}
              </Card.Text>
              <img
                src={restaurant.photosUrl[0]}
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


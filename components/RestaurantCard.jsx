import { Container, Row, Col, Card } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import {loadGoogleMapsScript} from '../utils/mapApi'
export const RestaurantCard = ({ restaurant }) => {
  const mapRef = useRef(null);

  const initMap = () => {
    const myLatLng = { lat: restaurant.latitude, lng: restaurant.longitude };
    const map = new google.maps.Map(mapRef.current, {
      zoom: 15,
      center: myLatLng,
    });

    new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: restaurant.name,
    });
  };
const apiKey= 'AIzaSyCseWSb0T4rbAKc_as_DuULSjybA_D3X3U';
  useEffect(() => {
    loadGoogleMapsScript(initMap, apiKey);
  }, [restaurant.latitude, restaurant.longitude, apiKey]);

  return (
    <Container>
      <Row className="justify-content-md-center" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
        <Col md={6}>
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
        <Col md={6}>
          <div ref={mapRef} style={{ height: '500px' }} />
        </Col>
      </Row>
    </Container>
  );
};


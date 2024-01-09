import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom"

export const PostedCard = (props) => {
  const { restaurant, deleteRestaurant } = props;

  return (
    <Card style={{ border: '0', maxHeight: '300px', fontSize: 'small', backgroundColor: 'yellow', margin: '15px'}}>
      <Card.Body>
        <Card.Title>
          <strong>Restaurant Name: </strong>
          {restaurant.name}
        </Card.Title>
        <Card.Text>
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
          style={{ maxWidth: '50%', maxHeight: '100px' }}
        />
      </Card.Body>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingBottom: '10px' }}>
        <Link to='/form'><button><img src="../assets/edit.png" alt="edit" style={{ width: '20px' }} /></button></Link>
        <button onClick={() => deleteRestaurant(restaurant.id)}><img src="../assets/delete.png" alt="delete" style={{ width: '20px' }} /></button>
      </div>
    </Card>
  );
};


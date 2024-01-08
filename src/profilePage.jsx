import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PostedCard } from '../components/PostedCard';
import { getRestaurantsByUserId, deleteRestaurantById } from '../utils/api'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const ProfilePage = () => {
    const [restaurants, setRestaurants] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState([]);

    const fetchRestaurants = () => {
        setIsLoading(true);
        setError('');

        getRestaurantsByUserId()
            .then(({ data }) => {
                setRestaurants(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Error fetching restaurants by userid');
                setIsLoading(false);
                console.error('Error fetching restaurants by userid:', error);
            });
    };

    const deleteRestaurant = (restaurantId) => {
        setError('');

        deleteRestaurantById(restaurantId)
            .then(() => {
                fetchRestaurants();
            })
            .catch((error) => {
                setError('Error deleting restaurant');
                console.error('Error deleting restaurant', error);
            });
    };


    useEffect(() => {
        fetchRestaurants();
    }, []);


    return (
        <>
            <Container fluid="md">
                <Row style={{ marginTop: '30px' }}>
                    <Col xs={1} />
                    <Col xs={10}>
                        Hello user, welcome to your grammable location page!
                        <Link to="/form">
                            <p>Post a new restaurant here</p>
                        </Link>

                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div>
                                {restaurants.length > 0 ? (
                                    <Row>
                                        {restaurants.map((restaurant, index) => (
                                            <Col md={6} key={index}>
                                                <PostedCard restaurant={restaurant} deleteRestaurant={deleteRestaurant}/>
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

    )
}
export default ProfilePage
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RestaurantCard } from '../components/RestaurantCard';
const ProfilePage = () => {
    return (
        <>
        <Container fluid="md">
            <Row style={{ marginTop: '30px' }}>
                <Col xs={1} /> 
                <Col xs={10}>
                    Hello user, welcome to your grammable location page!

                
                </Col>
                <Col xs={1} /> 
            </Row>
        </Container>
    </>
    )
}
export default ProfilePage
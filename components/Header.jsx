import { Button, Container, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Logout from './Logout';

const Header = () => {

  return (
     <div >
      <Container fluid="md">
        <Row  style={{ border: '5px solid #B522E1', backgroundColor: 'white', padding: '10px', borderRadius: '10px'}}>
          <Col xs={1} />
          <Col xs={4}>
            <h1>Get Gramming📸</h1>
          </Col>
          <Col xs={4} />
          <Col xs={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Link to="/profile">
              <Button style={{ backgroundColor: '#1982DE', color: 'white', borderRadius: '70px' }}>Profile</Button>
            </Link>
            <Logout/>
          </Col>
          <Col xs={1} />
        </Row>
      </Container>
    </div>
  );
};

export default Header;

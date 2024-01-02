import { Button, Container, Row, Col } from 'react-bootstrap';

const Header = () => {
  const handleProfileClick = () => {
    
  };

  return (
    <div style={{ border: '2px solid #BA1CE1', backgroundColor: 'white', padding: '10px' }}>
      <Container fluid="md">
        <Row>
          <Col xs={1} />
          <Col xs={3}>
            <h1>Get Gramming</h1>
          </Col>
          <Col xs={5} />
          <Col xs={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Button onClick={handleProfileClick} style={{ backgroundColor: '#1982DE', color: 'white' }}>Profile</Button>
          </Col>
          <Col xs={1} />
        </Row>
      </Container>
    </div>
  );
};

export default Header;

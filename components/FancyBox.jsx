import { useState } from 'react';
import { Container } from 'react-bootstrap';

const FancyBox = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Container
      className="fancyBox"
      style={{
        color: 'black',
        border: '3px solid #FF4CE7',
        borderRadius: '20px',
        padding: '20px',
        margin: '10px',
        boxShadow: isHovered ? '0 6px 12px black' : '0 4px 8px white',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: isHovered ? 'translateY(-5px)' : 'none',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Container>
  );
};

export default FancyBox;

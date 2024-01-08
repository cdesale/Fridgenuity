import React, { useEffect, useState } from 'react';
import { getAllCuisines } from '../utils/api';
import { Dropdown } from 'react-bootstrap';

const SortBar = ({ handleSort }) => {
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState('All Cuisines');

  useEffect(() => {
    getAllCuisines()
      .then(({ data }) => {
        setCuisines(['All Cuisines', ...data]);
      })
      .catch((error) => {
        console.error('Error fetching cuisines:', error);
      });
  }, []);

  const handleDropdownSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
    handleSort(cuisine === 'All Cuisines' ? '' : cuisine);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ backgroundColor: '#1982DE', borderRadius: '20px' }}>
        {selectedCuisine}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {cuisines.map((cuisine, index) => (
          <Dropdown.Item key={index} onClick={() => handleDropdownSelect(cuisine)}>
            {cuisine}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortBar;
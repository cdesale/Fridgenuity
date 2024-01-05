import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { storage } from "../config/firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Error from "./Error";
import "../assets/RestaurantForm.css";
import cities from '../Data/mock_city_DB.json'
import { loadGoogleMapsScript, initAutocomplete, getPlaceDetails } from '../utils/mapApi';

export const RestaurantForm = () => {
  const [formData, setFormData] = useState({
    city: "",
    cuisines: "",
    name: "",
    description: "",
    address: "",
    photosUrl: [],
  });
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);
  const [error, setError] = useState([]);


  useEffect(() => {
    loadGoogleMapsScript(() => {
      initAutocomplete('autocomplete', (autocomplete) => {
        const placeDetails = getPlaceDetails(autocomplete);
        if (placeDetails) {
          setFormData({
            ...formData,
            address: placeDetails.address,
            latitude: placeDetails.latitude,
            longitude: placeDetails.longitude,
          });
        }
      });
    }, 'AIzaSyCseWSb0T4rbAKc_as_DuULSjybA_D3X3U');
  }, []);


  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      if (file) {
        setPhoto(file);
        setUploadedFileNames(prevFileNames => [...prevFileNames, file.name]);
        handleUpload(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorMessages = [];

    if (uploading) {
      errorMessages.push("Please wait until the file upload is completed");
    }

    if (!formData.photosUrl) {
      errorMessages.push("File has not been uploaded yet");
    }

    setError(errorMessages);
    if (errorMessages.length === 0) {
      window.alert("Submission succeeded!");
      console.log(formData); //// make a call to post/new-restaurant
    }
  };

  const handleUpload = (file) => {
    if (!file) {
      console.error("No file to upload");
      return;
    }
    setUploading(true);
    const storageRef = ref(storage, `restaurant_photos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((photoUrl) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            photosUrl: [...prevFormData.photosUrl, photoUrl]
          }));
          console.log("Upload succeeded");
          setUploading(false);
        });
      }
    );
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCity" className="form-group">
              <Form.Label className="form-label">City</Form.Label>
              <Form.Control
                as="select"
                name="city"
                onChange={handleChange}
                required
              >
                {cities.map((city,index) => (
          <option key={index}>
            {city}
          </option>
        ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCuisine" className="form-group">
              <Form.Label className="form-label">Cuisine</Form.Label>
              <Form.Control
                as="select"
                name="cuisine"
                onChange={handleChange}
                required
              >
                <option value="thai">Thai</option>
                {/* make a call to get/all-cuisines*/}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formName" className="form-group">
              <Form.Label className="form-label">Restaurant Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="form-group">
              <Form.Label className="form-label">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="form-group">
    <Form.Label className="form-label">Address</Form.Label>
    <Form.Control
        type="text"
        id="autocomplete"
        name="address"
        onFocus={initAutocomplete}
        onChange={handleChange}
        required
    />
</Form.Group>

            <Form.Group controlId="formAddress" className="form-group">
              <Form.Label className="form-label">Upload restaurant photos:</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={handleChange}
                disabled={uploading}
                required
              />
            </Form.Group>
            {uploading && (
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${uploadProgress}%` }}
                >
                  Uploading... {Math.round(uploadProgress)}%
                </div>
              </div>
            )}
            <div style={{ whiteSpace: 'nowrap', overflow: 'auto', maxWidth: '100%' }}>
              {uploadedFileNames.join(',   ')}
            </div>
            {error.length > 0 && <Error errors={error} />}
            <Button variant="primary" type="submit" className="button" style={{ backgroundColor: '#1982DE', color: 'white', borderRadius: '70px' }} >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

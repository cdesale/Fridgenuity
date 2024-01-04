import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { storage } from './firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Error from './Error'
import './RestaurantForm.css';

const RestaurantForm = () => {
    const [formData, setFormData] = useState({
        city: '',
        cuisines: '',
        name: '',
        specialty: '',
        description: '',
        address: '',
        photo: null,
        photosUrl: ''
    });
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState([]);


    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            const file = e.target.files[0];
            if (file) {
                setFormData({ ...formData, photo: file });
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
          console.log(formData); 
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
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Upload error:", error);
                setUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(photoUrl => {
                    setFormData(prevFormData => ({ ...prevFormData, photosUrl: photoUrl }));
                    console.log('Upload succeeded');
                    setUploading(false);
                });
            }
        );
    };


    return (
        <Container>
            <Row >
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formCity" className="form-group" >
                            <Form.Label className="form-label" >City</Form.Label>
                            <Form.Control as="select" name="city" onChange={handleChange} required>
                                <option value="london">London</option>
                                {/* make a call to get/all-cities */}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formCuisine" className="form-group">
                            <Form.Label className="form-label">Cuisine</Form.Label>
                            <Form.Control as="select" name="cuisine" onChange={handleChange} required>
                                <option value="thai">Thai</option>
                                {/* make a call to get/all-cuisines*/}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formName" className='form-group'>
                            <Form.Label className='form-label'>Name</Form.Label>
                            <Form.Control type="text" name="name" onChange={handleChange}required />
                        </Form.Group>

                        <Form.Group controlId="formSpecialty" className='form-group'>
                            <Form.Label className='form-label'>Specialty</Form.Label>
                            <Form.Control type="text" name="specialty" onChange={handleChange}required />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className='form-group'>
                            <Form.Label className='form-label'>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group controlId="formAddress" className='form-group'>
                            <Form.Label className='form-label'>Address</Form.Label>
                            <Form.Control type="text" name="address" onChange={handleChange} required />
                        </Form.Group>
                        <input type="file" name="photo" onChange={handleChange} disabled={uploading} required/>
                        {uploading && (
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${uploadProgress}%` }}>
                                    Uploading... {Math.round(uploadProgress)}%
                                </div>
                            </div>
                        )}
                        {error.length > 0 && <Error errors={error} />}
                        <Button variant="primary" type="submit" className='button'>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RestaurantForm;

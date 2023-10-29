import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import NavBar from '../../layouts/AdminLayout/NavBar/index';


const UserData = () => {
    const history = useHistory(); 
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '', // New field for password confirmation
        phone_number: '',
        linkedin_profile: '',
        state: '',
        city: '',
        zip_code: '',
        document: null,
    });
    const userId= localStorage.getItem('current'); 
    
    console.log(userId);




    useEffect(() => {
        if(localStorage.getItem('current') === null){
            history.push('/auth/signin');
        }
        // Fetch user data based on the provided user ID
        axios.get(`http://localhost:8000/api/user/${userId}/`)
            .then((response) => {
                const userData = response.data;
                // Populate the form with the retrieved user data
                setFormData({
                    username: userData.username, // You need to populate this field
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email,
                    phone_number: userData.phone_number,
                    linkedin_profile: userData.linkedin_profile,
                    state: userData.state,
                    city: userData.city,
                    zip_code: userData.zip_code,
                    document: null, // You might handle documents differently
                });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);
    const [validationErrors, setValidationErrors] = useState({}); // State to hold validation errors
    const [base64String, setBase64String] = useState('');
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const dataUrl = reader.result;
                const base64Data = dataUrl.split(',')[1];
                setBase64String(base64Data);
            };
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (name === 'document') {
            // Handle document input separately
            setFormData((prevData) => ({
                ...prevData,
                document: files[0], // Set the document field to the selected file
            }));
        } else {
            // Handle other inputs
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate the form before submission
        if (validateForm()) {
            try {
                // Prepare the data for submission
                const dataToSend = {
                    username: formData.username,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    password: formData.password,
                    phone_number: formData.phone_number,
                    linkedin_profile: formData.linkedin_profile,
                    state: formData.state,
                    city: formData.city,
                    zip_code: formData.zip_code,
                    document: {
                        base64_data: base64String,
                    },
                };

                console.log('Data to send:', dataToSend);

                // Simulate an API request (replace with your actual API call)
                try {
                    const response = axios.post('http://localhost:8000/submit_applicant', dataToSend).then((response) => {
                        if (response.status === 201) {
                            console.log('Applicant submitted successfully');
                            // Reset the form
                            setFormData({
                                username: '',
                                first_name: '',
                                last_name: '',
                                email: '',
                                password: '',
                                confirmPassword: '', // Reset the password confirmation field
                                phone_number: '',
                                linkedin_profile: '',
                                state: '',
                                city: '',
                                zip_code: '',
                                document: null,
                            });
                        } else {
                            console.error('Error:', response.data);
                        }
                    });
                } catch (error) {
                    console.error('Error:', error);
                }
            } catch (error) {
                console.error('Error sending data to API:', error);
            }
        }
    };

    const validateForm = () => {
        // Define validation rules for each field
        const rules = {
            first_name: /^[a-zA-Z\s]*$/,
            last_name: /^[a-zA-Z\s]*$/,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+/,
            phone_number: /^\d{8}/,
            linkedin_profile: /^https?:\/\/(www\.)?linkedin\.com\/.*/,
            city: /^[a-zA-Z\s]*$/,
            state: /^[a-zA-Z\s]*$/,
            zip_code: /^\d{4}/,
        };

        // Create an object to hold validation errors
        const errors = {};

        // Check each field against its corresponding validation rule
        for (const field in rules) {
            if (!rules[field].test(formData[field])) {
                errors[field] = `Invalid ${field}`;
            }
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            errors['confirmPassword'] = 'Passwords do not match';
        }

        // Update the state with the validation errors
        setValidationErrors(errors);

        // Check if there are any validation errors
        return Object.keys(errors).length === 0;
    };

    return (
        <div>
        <NavBar/> 

        <React.Fragment>
        <Row>
            <Col sm={12}>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">User Data</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formGridUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Username"
                                        isInvalid={validationErrors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">{validationErrors.username}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                            isInvalid={validationErrors.email}
                                            required
                                        />
                                    </InputGroup>
                                    <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formGridFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        isInvalid={validationErrors.first_name}
                                    />
                                    <Form.Control.Feedback type="invalid">{validationErrors.first_name}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formGridLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        isInvalid={validationErrors.last_name}
                                    />
                                    <Form.Control.Feedback type="invalid">{validationErrors.last_name}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        isInvalid={validationErrors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formGridConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        isInvalid={validationErrors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">{validationErrors.confirmPassword}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                        <Form.Group controlId="formGridPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                isInvalid={validationErrors.phone_number}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.phone_number}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col md={6}>
                        <Form.Group controlId="formGridLinkedInProfile">
                            <Form.Label>LinkedIn Profile</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="linkedin_profile"
                                value={formData.linkedin_profile}
                                onChange={handleChange}
                                placeholder="LinkedIn Profile"
                                isInvalid={validationErrors.linkedin_profile}
                            />
                            <Form.Control.Feedback type="invalid">{validationErrors.linkedin_profile}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        isInvalid={validationErrors.state}
                                    />
                                    <Form.Control.Feedback type="invalid">{validationErrors.state}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        required
                                        isInvalid={validationErrors.city}
                                    />
                                    <Form.Control.Feedback type="invalid">{validationErrors.city}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="formGridZipCode">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="zip_code"
                                        value={formData.zip_code}
                                        onChange={handleChange}
                                        placeholder="Zip Code"
                                        required
                                        isInvalid={validationErrors.zip_code}
                                    />
                                    <Form.Control.Feedback type="invalid">{validationErrors.zip_code}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="formGridDocument">
                        <Form.Label>Choose a Document</Form.Label>
                        <InputGroup>
                            <div className="custom-file">
                                <Form.Control
                                    aria-describedby="custom-addons7"
                                    type="file"
                                    className="custom-file-input"
                                    id="validatedCustomFile3"
                                    name="document"
                                    onChange={(e) => {
                                        handleFileChange(e);
                                    }}
                                />
                                <Form.Label className="custom-file-label" htmlFor="validatedCustomFile3">
                                    {formData.document ? formData.document.name : 'Choose file'}
                                </Form.Label>
                            </div>
                        </InputGroup>
                    </Form.Group>

                    <div className="text-center"> 
                        <Button type="submit">Submit</Button>
                    </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </React.Fragment>
    </div> 
);
    };

export default UserData;

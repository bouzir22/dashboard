import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const Application = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone_number: '',
        linkedin_profile: '',
        state: '',
        city: '',
        zip_code: '',
        selected_file: null,
    });

    const [validationErrors, setValidationErrors] = useState({}); // State to hold validation errors

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : files ? files[0] : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log('Data to send:', formData);

        // Validate the form before submission
        if (validateForm()) {
            try {
                // Send the data to your API endpoint
                const response = await axios.post('http://localhost:8000/submit_applicant', formData);
                console.log('Response from API:', response.data);

                if (response.status === 201) {
                    console.log('Applicant submitted successfully');
                    // Reset the form
                    setFormData({
                        first_name: '',
                        last_name: '',
                        username: '',
                        email: '',
                        phone_number: '',
                        linkedin_profile: '',
                        state: '',
                        city: '',
                        zip_code: '',
                        selected_file: null,
                    });
                }
            } catch (error) {
                console.error('Error sending data to API:', error);
                // You can handle errors and provide feedback to the user
            }
        }
    };

    const validateForm = () => {
        // Define validation rules for each field
        const rules = {
            first_name: /^[a-zA-Z\s]*$/, // Alphabetic characters and spaces only
            last_name: /^[a-zA-Z\s]*$/,
            username: /^\w+$/, // Alphanumeric characters and underscores only
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
            phone_number: /^\d{8}$/, // 8-digit phone number
            linkedin_profile: /^https?:\/\/(www\.)?linkedin\.com\/.*/, // Basic URL validation
            city: /^[a-zA-Z\s]*$/,
            state: /^[a-zA-Z\s]*$/,
            zip_code: /^\d{4}$/, // 4-digit ZIP code
        };

        // Create an object to hold validation errors
        const errors = {};

        // Check each field against its corresponding validation rule
        for (const field in rules) {
            if (!rules[field].test(formData[field])) {
                errors[field] = `Invalid ${field}`;
            }
        }

        // Update the state with the validation errors
        setValidationErrors(errors);

        // Check if there are any validation errors
        return Object.keys(errors).length === 0;
    };

    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Validation</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Form.Row>
                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            isInvalid={validationErrors.first_name}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.first_name}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            isInvalid={validationErrors.last_name}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.last_name}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Username"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            isInvalid={validationErrors.username}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.username}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
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
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            placeholder="Phone number"
                                            isInvalid={validationErrors.phone_number}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.phone_number}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>LinkedIn profile</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="linkedin_profile"
                                            value={formData.linkedin_profile}
                                            onChange={handleChange}
                                            placeholder="LinkedIn profile"
                                            isInvalid={validationErrors.linkedin_profile}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.linkedin_profile}</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="State"
                                            isInvalid={validationErrors.state}
                                        >
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">{validationErrors.state}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCity">
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
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="zip_code"
                                            value={formData.zip_code}
                                            onChange={handleChange}
                                            placeholder="Zip"
                                            required
                                            isInvalid={validationErrors.zip_code}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.zip_code}</Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <Form.Group as={Col} md="6" controlId="validationCustomFile">
                                        <Form.Label>Choose a File</Form.Label>
                                        <InputGroup>
                                            <div className="custom-file">
                                                <Form.Control
                                                    aria-describedby="custom-addons7"
                                                    type="file"
                                                    className="custom-file-input"
                                                    id="validatedCustomFile3"
                                                    name="selected_file"
                                                    onChange={handleChange}
                                                />
                                                <Form.Label className="custom-file-label" htmlFor="validatedCustomFile3">
                                                    {formData.selected_file ? formData.selected_file.name : 'Choose file'}
                                                </Form.Label>
                                            </div>
                                        </InputGroup>
                                    </Form.Group>
                                
                                </Form.Row>
                                <Button type="submit">Submit form</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Application;

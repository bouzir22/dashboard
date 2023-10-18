import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const Application = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        linkedinProfile: '',
        state: '',
        city: '',
        stateText: '',
        zip: '',
        agreeToTerms: false,
        selectedFile: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : files ? files[0] : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Create an object from the form data
        const dataToSend = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            linkedinProfile: formData.linkedinProfile,
            state: formData.state,
            city: formData.city,
            stateText: formData.stateText,
            zip: formData.zip,
            agreeToTerms: formData.agreeToTerms,
            selectedFile: formData.selectedFile,
            // Add more fields as needed
        };

        try {
            // Send the data to your API endpoint
            const response =  axios.post('YOUR_API_ENDPOINT', dataToSend);
            console.log('Response from API:', response.data);
            // You can also handle success feedback here
        } catch (error) {
            console.error('Error sending data to API:', error);
            // You can handle errors and provide feedback to the user
        }
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
                            <Form onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                placeholder="Username"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="Phone number"
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>LinkedIn profile</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="linkedinProfile"
                                            value={formData.linkedinProfile}
                                            onChange={handleChange}
                                            placeholder="LinkedIn profile"
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                        >
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </Form.Control>
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
                                        />
                                        <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="stateText"
                                            value={formData.stateText}
                                            onChange={handleChange}
                                            placeholder="State"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleChange}
                                            placeholder="Zip"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Please provide a valid zip.</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group>
                                    <Form.Check
                                        required
                                        label="Agree to terms and conditions"
                                        feedback="You must agree before submitting."
                                        name="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <InputGroup className="mb-3 cust-file-button">
                                    <InputGroup.Prepend>
                                        <Button id="custom-addons7">Button</Button>
                                    </InputGroup.Prepend>
                                    <div className="custom-file">
                                        <Form.Control
                                            aria-describedby="custom-addons7"
                                            type="file"
                                            className="custom-file-input"
                                            id="validatedCustomFile3"
                                            name="selectedFile"
                                            onChange={handleChange}
                                        />
                                        <Form.Label className="custom-file-label" htmlFor="validatedCustomFile3">
                                            Choose file
                                        </Form.Label>
                                    </div>
                                </InputGroup>
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

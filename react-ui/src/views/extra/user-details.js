import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const UserDetails = () => {
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

        // Validate the form before submission
        if (validateForm()) {
            // Proceed with submitting data
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
                const response = await axios.post('YOUR_API_ENDPOINT', dataToSend);
                console.log('Response from API:', response.data);
                // You can also handle success feedback here
            } catch (error) {
                console.error('Error sending data to API:', error);
                // You can handle errors and provide feedback to the user
            }
        }
    };

    const validateForm = () => {
        // Define validation rules for each field
        const rules = {
            firstName: /^[a-zA-Z\s]*$/, // Alphabetic characters and spaces only
            lastName: /^[a-zA-Z\s]*$/,
            username: /^\w+$/, // Alphanumeric characters and underscores only
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
            phoneNumber: /^\d{8}$/, // 10-digit phone number
            linkedinProfile: /^https?:\/\/(www\.)?linkedin\.com\/.*/, // Basic URL validation
            city: /^[a-zA-Z\s]*$/,
            stateText: /^[a-zA-Z\s]*$/,
            zip: /^\d{5}$/, // 5-digit ZIP code
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
                                            isInvalid={validationErrors.firstName}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.firstName}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            isInvalid={validationErrors.lastName}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.lastName}</Form.Control.Feedback>
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
                                                isInvalid={validationErrors.username}
                                            />
                                            <Form.Control.Feedback type="invalid">{validationErrors.username}</Form.Control.Feedback>
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
                                            isInvalid={validationErrors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
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
                                            isInvalid={validationErrors.phoneNumber}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.phoneNumber}</Form.Control.Feedback>
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
                                            isInvalid={validationErrors.linkedinProfile}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.linkedinProfile}</Form.Control.Feedback>
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
                                            isInvalid={validationErrors.state}
                                        >
                                            <option>Choose...</option>
                                            <option>...</option>
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
                                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="stateText"
                                            value={formData.stateText}
                                            onChange={handleChange}
                                            placeholder="State"
                                            required
                                            isInvalid={validationErrors.stateText}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.stateText}</Form.Control.Feedback>
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
                                            isInvalid={validationErrors.zip}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.zip}</Form.Control.Feedback>
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
                                            Choose file ("only pdf")
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

export default UserDetails;

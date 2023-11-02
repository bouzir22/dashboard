import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Registeration = () => {
    const history = useHistory();
    const [pdfData, setPdfData] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [fileName, setfileName] = useState('');

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        linkedin_profile: '',
        state: '',
        city: '',
        zip_code: '',
        document: null,
    });
    const userId = localStorage.getItem('current');

    useEffect(() => {
        if (localStorage.getItem('current') === null) {
            history.push('/auth/signin');
        }
        // Fetch user data based on the provided user ID
        axios.get(`http://localhost:8000/api/applicant/${userId}/`)
            .then((response) => {
                const userData = response.data;

                setFormData({
                    
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email,
                    phone_number: userData.phone_number,
                    linkedin_profile: userData.linkedin_profile,
                    state: userData.state,
                    city: userData.city,
                    zip_code: userData.zip_code,
                    document: null, // Since document data is fetched separately
                });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);

    const [validationErrors, setValidationErrors] = useState({});
    const [base64String, setBase64String] = useState('');

    const handleFileChange = (event) => {
        console.log(event.target.files[0].name);
        setfileName(event.target.files[0].name);
        const file = event.target.files[0];

        if (file) {
            console.log(file.url);
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const dataUrl = reader.result;
                console.log(dataUrl);
                const base64Data = dataUrl.split(',')[1];
                setBase64String(base64Data);
            };
        }
    };

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
            try {
                // Prepare the data for submission
                const dataToSend = {
                    //user_ptr__id: localStorage.getItem('current'),
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    //email: formData.email,
                    phone_number: formData.phone_number,
                    linkedin_profile: formData.linkedin_profile,
                    state: formData.state,
                    city: formData.city,
                    zip_code: formData.zip_code,
                    document: {
                        name: fileName,
                        base64_data: base64String,
                    },
                };

                console.log('Data to send:', dataToSend);

                // Simulate an API request (replace with your actual API call)
                try {
                    const response = axios.post('http://localhost:8000/api/applicants/' , dataToSend).then((response) => {
                        if (response.status === 201) {
                            console.log(response.data);
                            console.log('Applicant submitted successfully');
                            // Reset the form
                            setFormData({
                                first_name: '',
                                last_name: '',
                                email: '',
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
                console.error('Error sending data to the API:', error);
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

        // Update the state with the validation errors
        setValidationErrors(errors);

        // Check if there are any validation errors
        return Object.keys(errors).length === 0;
    };

    return (
        <div>
            <React.Fragment>
                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Applicant Data</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                    {/* Personal Information Section */}
                                    <Form.Group controlId="personalInfo">
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
                                                <Form.Control.Feedback type="invalid">
                                                    {validationErrors.first_name}
                                                </Form.Control.Feedback>
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
                                                <Form.Control.Feedback type="invalid">
                                                    {validationErrors.last_name}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                             
                                        </Form.Row>
                                    </Form.Group>

                                    {/* Contact Information Section */}
                                    <Form.Group controlId="contactInfo">
                                        <Form.Row>
                                            <Form.Group as={Col} md="6" controlId="validationCustom02">
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
                                                <Form.Control.Feedback type="invalid">
                                                    {validationErrors.phone_number}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group as={Col} md="6" controlId="validationCustom02">
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
                                                <Form.Control.Feedback type="invalid">
                                                    {validationErrors.linkedin_profile}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                    </Form.Group>

                                    {/* Address Section */}
                                    <Form.Group controlId="addressInfo">
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
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {validationErrors.state}
                                                </Form.Control.Feedback>
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
                                                <Form.Control.Feedback type="invalid">
                                                    {validationErrors.city}
                                                </Form.Control.Feedback>
                                            </Form.Group>

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
                                                <Form.Control.Feedback type="invalid">
                                                    {validationErrors.zip_code}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Form.Row>
                                    </Form.Group>

                                    {/* Document Upload Section */}
                                    <Form.Group controlId="documentInfo">
                                        <Form.Row>
                                            <Form.Group as={Col} md="12" controlId="validationCustomFile">
                                                <Form.Label>Choose a File</Form.Label>
                                                <InputGroup>
                                                    <div className="custom-file">
                                                        <Form.Control
                                                            aria-describedby="custom-addons7"
                                                            type="file"
                                                            className="custom-file-input"
                                                            id="validatedCustomFile3"
                                                            name="document"
                                                            onChange={handleFileChange}
                                                        />
                                                        <Form.Label className="custom-file-label" htmlFor="validatedCustomFile3">
                                                            {formData.document ? formData.document.name : 'Choose file'}
                                                        </Form.Label>
                                                    </div>
                                                </InputGroup>
                                            </Form.Group>
                                        </Form.Row>
                                    </Form.Group>

                                    <div className="text-center">
                                        <Button type="submit">Submit form</Button>
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

export default Registeration;

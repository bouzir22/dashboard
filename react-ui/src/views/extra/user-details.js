import React, { useState,useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, Tabs, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PdfPreview from './pdf-viewer';
const UserDetails = () => {
    const [validated, setValidated] = useState(false);
    const [validatedTooltip, setValidatedTooltip] = useState(false);
    const [supportedCheckbox, setSupportedCheckbox] = useState(false);
    const [supportedRadio, setSupportedRadio] = useState(false);
    const [supportedSelect, setSupportedSelect] = useState(0);
    const [supportedFile, setSupportedFile] = useState(0);
    const pdfUrl='https://msnlabs.com/img/resume-sample.pdf'

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const handleSubmitTooltip = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidatedTooltip(true);
    };

    const supportedSelectHandler = (event) => {
        setSupportedSelect(parseInt(event.target.value));
    };

    const supportedFileHandler = (event) => {
        setSupportedFile(!!event.target.value);
    };

 
        const { id } = useParams(); // Get the ID from the URL using useParams
    
     
        const [user, setUser] = useState({
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phoneNumber: '',
            linkedinProfile: '',
            state: '',
            city: '',
            zip: '',
        });
    
        // Function to fetch user data based on the ID
        const fetchUserData = async (userId) => {
            try {
                // Replace this with your actual API request to fetch user data
                const response = await fetch(`/api/users/${userId}`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        // Use useEffect to fetch user data when the component mounts and when the ID changes
        useEffect(() => {
            if (id) {
                fetchUserData(id);
            }
        }, [id]);
    

    return (
        <React.Fragment>

<Tabs defaultActiveKey="profile">
                        <Tab eventKey="profile" title="PROFILE">
                            <p>
                            <Row>
            <Col sm={12} md={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">User Details</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated}>
                                <Form.Row>
                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control required type="text" placeholder="First name" defaultValue="Mark" />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control required type="text" placeholder="Last name" defaultValue="Otto" />
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
                                                placeholder="Username"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                             
                                </Form.Row>
                                <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control as="select">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control as="select">
                                            <option>Choose...</option>
                                            <option>...</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                              
                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" placeholder="City" required />
                                        <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control type="text" placeholder="State" required />
                                        <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control type="text" placeholder="Zip" required />
                                        <Form.Control.Feedback type="invalid">Please provide a valid zip.</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                              
                   
                                <Button variant='warning' onClick={(e) => handleSubmit(e)}>Update </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
       
            </Row>                   </p>
                        </Tab>
                        <Tab eventKey="contact" title="CONTACT">
                        <Row>
            <Col sm={12} md={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">User Details</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated}>
                                <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>phone number</Form.Label>
                                        <Form.Control required type="number" placeholder="Last name" defaultValue="Otto" />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                                        <Form.Label>linkedin profile</Form.Label>
                                        <Form.Control required type="text" placeholder="Last name" defaultValue="Otto" />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                        
                                </Form.Row>
                         
                   
                                <Button variant='warning' onClick={(e) => handleSubmit(e)}>Update </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
       
            </Row> 
                        </Tab>
                        <Tab eventKey="files" title="FILES">
                        <PdfPreview pdfUrl={pdfUrl} />
                        </Tab>
                    </Tabs>

          
        </React.Fragment>
    );
};

export default UserDetails;
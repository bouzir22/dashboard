import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Collapse, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Application from './application';
import NavBar from '../../layouts/AdminLayout/NavBar/index';

const JobList = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [accordionKey, setAccordionKey] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const userId = localStorage.getItem('current');

    const fetchOpportunities = async () => {
        try {
            const response = await axios.get('http://localhost:8000/available-opportunities/');
            setOpportunities(response.data);
        } catch (error) {
            console.error('Error fetching opportunities:', error);
        }
    };

    useEffect(() => {
        fetchOpportunities();
    }, []);

    const handleAccordionClick = (index) => {
        if (accordionKey === index) {
            setAccordionKey(null);
        } else {
            setAccordionKey(index);
        }
    };

    const handleApply = (jobId) => {
        // Send an API request to apply for the job with userId and jobId
        axios
            .get(`http://localhost:8000/application/apply/${userId}/${jobId}/`)
            .then((response) => {
                console.log('Applied for job successfully:', response.data);
                alert('Applied for job successfully');
            })
            .catch((error) => {
                console.error('Error applying for job:', error);
                alert('you have already applied for this job');
            });
    };

    // Custom search component
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter opportunities based on the search query
    const filteredOpportunities = opportunities.filter((opportunity) =>
        opportunity.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <NavBar />
            <Card>
                <Row>
                    <Col sm={12}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                onChange={handleSearch}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <div className="accordion" id="jobsAccordion">
                            <h5>Available jobs</h5>
                            <hr />
                            {filteredOpportunities.map((jobOpportunity, index) => (
                                <Card className="mt-2" key={index}>
                                    <Card.Header>
                                        <Card.Title as="h5">
                                            <Link
                                                to="#"
                                                onClick={() => handleAccordionClick(index)}
                                                aria-controls={`accordion${index + 1}`}
                                                aria-expanded={accordionKey === index}
                                            >
                                                {jobOpportunity.title}
                                            </Link>
                                        </Card.Title>
                                    </Card.Header>
                                    <Collapse in={accordionKey === index}>
                                        <div id={`accordion${index + 1}`}>
                                            <Card.Body>
                                                <Card.Text>
                                                    <h5>Description:</h5>
                                                    {jobOpportunity.description}
                                                </Card.Text>
                                                <Card.Text>
                                                    <h5>Requirements:</h5>
                                                    {jobOpportunity.requirements}
                                                </Card.Text>
                                                <Card.Text>
                                                    <h5>Benefits:</h5>
                                                    {jobOpportunity.benefits}
                                                </Card.Text>
                                                <div className="float-right">
                                                    <Button
                                                        variant="primary" // Changed to "Apply"
                                                        onClick={() => handleApply(jobOpportunity.id)}
                                                    >
                                                        Apply
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </div>
                                    </Collapse>
                                    {selectedJobId === jobOpportunity.id && (
                                        <Collapse in={selectedJobId === jobOpportunity.id}>
                                            <div id={`applicationForm${index + 1}`}>
                                                <Card.Body>
                                                    <Form>
                                                        <Application />
                                                    </Form>
                                                </Card.Body>
                                            </div>
                                        </Collapse>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default JobList;

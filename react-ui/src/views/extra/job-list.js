import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobList = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [accordionKey, setAccordionKey] = useState(null);

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

    const handleSearch = () => {
        // Implement search functionality if needed
    };

    const handleAccordionClick = (index) => {
        if (accordionKey === index) {
            setAccordionKey(null);
        } else {
            setAccordionKey(index);
        }
    };

    const handleApply = (jobId) => {
        console.log(`Applied for job with ID: ${jobId}`);
    };

    const handleRemove = (jobId) => {
        console.log(`Removed job with ID: ${jobId}`);
    };

    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for jobs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button className="btn btn-primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <div className="accordion" id="jobsAccordion">
                        <h5>Available jobs</h5>
                        <hr />
                        {opportunities.map((jobOpportunity, index) => (
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
                                    <div className="float-right">
                                        <Button
                                            variant="success"
                                            onClick={() => handleApply(jobOpportunity.id)}
                                        >
                                            Apply
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemove(jobOpportunity.id)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
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
                                        </Card.Body>
                                    </div>
                                </Collapse>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default JobList;

import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobList = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchOpportunities = async () => {
        try {
            const response = await axios.get('http://localhost:8000/opportunities');
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

    const [isMultiTarget, setIsMultiTarget] = useState([]);
    const [accordionKey, setAccordionKey] = useState(1);

    const targetHandler = (target) => {
        if (isMultiTarget.findIndex((item) => item === target) > -1) {
            setIsMultiTarget((prevState) => {
                return prevState.filter((item) => item !== target);
            });
        } else {
            setIsMultiTarget((prevState) => {
                return [...prevState, target];
            });
        }
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
                <Col sm={12} className="accordion">
                    <h5>Available jobs</h5>
                    <hr />
                    {opportunities.map((jobOpportunity, index) => (
                        <Card className="mt-2" key={index}>
                            <Card.Header>
                                <Card.Title as="h5">
                                    <Link
                                        to="#"
                                        onClick={() =>
                                            setAccordionKey(
                                                accordionKey !== index + 1 ? index + 1 : 0
                                            )
                                        }
                                        aria-controls={`accordion${index + 1}`}
                                        aria-expanded={accordionKey === index + 1}
                                    >
                                        {jobOpportunity.title}
                                    </Link>
                                </Card.Title>
                            </Card.Header>
                            <Collapse in={accordionKey === index + 1}>
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
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default JobList;

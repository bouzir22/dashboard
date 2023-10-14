import React, { useState } from 'react';
import { Row, Col, Button, Card, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 

const JobList = () => {
    const jobOpportunities = [
        {
            title: 'Software Engineer',
            description: 'We are looking for a talented and experienced Software Engineer to join our team. The ideal candidate will have a strong understanding of software development principles and practices, as well as experience with Java, Python, and/or C++.',
        },
        {
            title: 'Web Developer',
            description: 'We are looking for a Web Developer to join our team. The ideal candidate will have experience with HTML, CSS, and JavaScript, as well as experience with React, Angular, and/or Vue.js.',
        },
        {
            title: 'Data Scientist',
            description: 'We are looking for a Data Scientist to join our team. The ideal candidate will have a strong understanding of data science principles and practices, as well as experience with Python, R, and/or SQL.',
        },
    ];
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Filter the job list based on the search query
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
                            <Button className="btn btn-primary" onClick={handleSearch}>Search</Button>
                        </div>
                </Col>
            </Row>
            <Row>
            
            </Row>
            <Row className="btn-page">
             
                <Col sm={12} className="accordion">
                    <h5>Available jobs</h5>
                    <hr />
                    {jobOpportunities.map((jobOpportunity, index) => (
                        <Card className="mt-2" key={index}>
                            <Card.Header>
                                <Card.Title as="h5">
                                    <Link
                                        to="#"
                                        onClick={() => setAccordionKey(accordionKey !== index + 1 ? index + 1 : 0)}
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
                                            {jobOpportunity.description}
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

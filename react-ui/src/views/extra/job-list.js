import React, { useState } from 'react';
import { Row, Col, Button, Card, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 

const JobList = () => {
    const [isBasic, setIsBasic] = useState(false);
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
            
            </Row>
            <Row className="btn-page">
             
                <Col sm={12} className="accordion">
                    <h5>Accordion Example</h5>
                    <hr />
                    <Card className="mt-2">
                        <Card.Header>
                            <Card.Title as="h5">
                                <Link
                                    to="#"
                                    onClick={() => setAccordionKey(accordionKey !== 1 ? 1 : 0)}
                                    aria-controls="accordion1"
                                    aria-expanded={accordionKey === 1}
                                >
                                    Collapsible Group Item #1
                                </Link>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={accordionKey === 1}>
                            <div id="accordion1">
                                <Card.Body>
                                    <Card.Text>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
                                        wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                                        eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                                        sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                                        labore sustainable VHS.
                                    </Card.Text>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>
                    <Card className="mt-2">
                        <Card.Header>
                            <Card.Title as="h5">
                                <Link
                                    to="#"
                                    onClick={() => setAccordionKey(accordionKey !== 2 ? 2 : 0)}
                                    aria-controls="accordion2"
                                    aria-expanded={accordionKey === 2}
                                >
                                    Collapsible Group Item #2
                                </Link>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={accordionKey === 2}>
                            <div id="accordion2">
                                <Card.Body>
                                    <Card.Text>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
                                        wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                                        eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                                        sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                                        labore sustainable VHS.
                                    </Card.Text>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>
                    <Card className="mt-2">
                        <Card.Header>
                            <Card.Title as="h5">
                                <Link
                                    to="#"
                                    onClick={() => setAccordionKey(accordionKey !== 3 ? 3 : 0)}
                                    aria-controls="accordion3"
                                    aria-expanded={accordionKey === 3}
                                >
                                    Collapsible Group Item #3
                                </Link>
                            </Card.Title>
                        </Card.Header>
                        <Collapse in={accordionKey === 3}>
                            <div id="accordion3">
                                <Card.Body>
                                    <Card.Text>
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
                                        wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                                        eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                                        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                                        sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                                        farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                                        labore sustainable VHS.    <Button className="btn-icon btn-rounded btn-success"  >
            <i className="feather icon-check-circle" />
        </Button>
                                    </Card.Text>
                                </Card.Body>
                            </div>
                        </Collapse>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default JobList;

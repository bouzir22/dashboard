import React from 'react';
import { Row, Col, Card ,Button} from 'react-bootstrap';

const OpportunityPreview =  ({ jobData }) => {
    const buttonOnlyIconOptions = [
 
        { variant: 'success', icon: 'feather icon-check-circle' },
        { variant: 'danger', icon: 'feather icon-slash' },
        { variant: 'warning', icon: 'feather icon-alert-triangle' },
 
    ];
    const onlyIconButtons = buttonOnlyIconOptions.map((button, idx) => (
        <Button className="btn-icon" key={idx} variant={button.variant}>
            <i className={button.icon} />
        </Button>
    ));
    const test = {
        title: 'Software Engineer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        requirements: ['Bachelor\'s degree in Computer Science', 'Experience with JavaScript', 'Strong problem-solving skills'],
        benefits: ['Competitive salary', 'Flexible working hours', 'Healthcare benefits'],
      };
    const { title, description, requirements, benefits } = test;
    return (
        <React.Fragment>
        <Row>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">      {title}     </Card.Title>
              </Card.Header>
              <Card.Body>
                <h5>Description</h5>
                <p>{description}</p> <div>  
        </div>
  
                <h5>Requirements</h5>
                <ul className="list-unstyled">
                  {requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
  
                <h5>Benefits</h5>
                <ul className="list-unstyled">
                  {benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </Card.Body>
             <Col><Col md={4}></Col><Col title="Only Icon">{onlyIconButtons}</Col> </Col>  
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
};

export default OpportunityPreview;

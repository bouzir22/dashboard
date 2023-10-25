import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Application from './application';

const OpportunityPreview = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSuccessButtonClicked, setIsSuccessButtonClicked] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/opportunities/${id}/`)
      .then((response) => {
        setJobData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
        setLoading(false);
      });
  }, [id]);

  const handleSuccessButtonClick = () => {
    setIsSuccessButtonClicked(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!jobData) {
    return <p>No job data available.</p>;
  }

  const { title, description, requirements, benefits, due_date, status } = jobData;

  const buttonOnlyIconOptions = [
    { variant: 'success', icon: 'feather icon-check-circle' },
    { variant: 'danger', icon: 'feather icon-slash' },
    { variant: 'warning', icon: 'feather icon-alert-triangle' },
  ];

  const onlyIconButtons = buttonOnlyIconOptions.map((button, idx) => (
    <Button
      className="btn-icon"
      key={idx}
      variant={button.variant}
      onClick={handleSuccessButtonClick}
    >
      <i className={button.icon} />
    </Button>
  ));

  // Application form component
  const ApplicationForm = (
    <Form>
      <Application/>
    </Form>
  );

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
      <Col md={8} xl={4}>
        <Card>
          <Card.Header>
            <Card.Title as="h5">{title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <h5>Description</h5>
            <p>{description}</p>

            <h5>Requirements</h5>
            <p>{requirements}</p>

            <h5>Benefits</h5>
            <p>{benefits}</p>

            <h5>Due Date</h5>
            <p>{due_date}</p>

            <h5>Status</h5>
            <p>{status}</p>
          </Card.Body>
          <div className="mt-3">
            {onlyIconButtons}
          </div>
        </Card>
      </Col>
      </div>
      <Col>
        <div>
          {isSuccessButtonClicked && ApplicationForm}
        </div>
      </Col>
    </React.Fragment>
  );
};

export default OpportunityPreview;

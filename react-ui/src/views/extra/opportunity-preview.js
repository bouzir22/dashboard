import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Opportunity from './Opportunity';

const OpportunityPreview = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isYellowButtonClicked, setIsYellowButtonClicked] = useState(false);
  const history = useHistory(); // Import useHistory from react-router-dom

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

  const handleYellowButtonClick = () => {
    setIsYellowButtonClicked(true);
  };

  const handleDeleteOpportunity = () => {
    // Send a request to your API to delete the opportunity based on its ID
    axios
      .delete(`http://localhost:8000/opportunity/${id}/`)
      .then(() => {
        // Redirect to a different page or perform any desired action after deletion
        history.push('/Jobs'); // Example: Redirect to the opportunities page
      })
      .catch((error) => {
        console.error('Error deleting opportunity:', error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!jobData) {
    return <p>No job data available.</p>;
  }

  const { title, description, requirements, benefits, due_date, status } = jobData;

  const buttonOnlyIconOptions = [
    { variant: 'warning', icon: 'feather icon-settings' },
    { variant: 'danger', icon: 'feather icon-trash-2' }, // Add a danger button
  ];

  const onlyIconButtons = buttonOnlyIconOptions.map((button, idx) => (
    <Button
      className="btn-icon"
      key={idx}
      variant={button.variant}
      onClick={button.variant === 'warning' ? handleYellowButtonClick : handleDeleteOpportunity}
    >
      <i className={button.icon} />
    </Button>
  ));

  const ApplicationForm = (
    <Form>
      <Opportunity opportunityData={jobData} />
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
          {isYellowButtonClicked && ApplicationForm}
        </div>
      </Col>
    </React.Fragment>
  );
};

export default OpportunityPreview;

import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ApplicationPreview = () => {
  const { id } = useParams();
  const [applicantData, setApplicantData] = useState({});
  const [opportunityData, setOpportunityData] = useState({});
  const [pdfData, setPdfData] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [score, setScore] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);

  useEffect(() => {
    // Fetch application data based on the applicationId
    axios.get(`http://localhost:8000/api/applications/${id}/`)
      .then((response) => {
        const data = response.data;

        if (data.applicant) {
          // Set the applicant data
          setApplicantData(data.applicant);

          // Now, fetch additional data for the applicant
          axios.get(`http://localhost:8000/api/applicants/${data.applicant}/`)
            .then((applicantResponse) => {
              const applicant = applicantResponse.data;
              // Merge the applicant data with the existing applicantData
              setApplicantData((prevData) => ({ ...prevData, ...applicant }));
            })
            .catch((error) => {
              console.error('Error fetching applicant data:', error);
            });
        }

        if (data.opportunity) {
          setOpportunityData(data.opportunity);

          // Now, fetch additional data for the opportunity (job title)
          axios.get(`http://localhost:8000/opportunity/${data.opportunity}/`)
            .then((opportunityResponse) => {
              const opportunity = opportunityResponse.data;
              // Update the applicantData with the job title
              setOpportunityData((prevData) => ({ ...prevData, ...opportunity }));
            })
            .catch((error) => {
              console.error('Error fetching opportunity data:', error);
            });
        }
        if (data.score) {
          // Format the score by multiplying by 100 and keeping 2 decimal places
          const formattedScore = (data.score * 100).toFixed(2);
          setScore(formattedScore);
        }
        if (data.created_date) {
          // Format the date as "dd/mm/yyyy"
          const date = new Date(data.created_date);
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
          setCreatedDate(formattedDate);
        }

        if (data.document) {
          // Decode the base64-encoded PDF data
          const decodedPdfData = atob(data.document);
          setPdfData(decodedPdfData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };
  const handleAction = (applicationId, action) => {
    const endpoint =
      action === 'reject'
        ? `http://localhost:8000/reject-application/${applicationId}/`
        : `http://localhost:8000/accept-application/${applicationId}/`;

    axios
      .post(endpoint)
      .then((response) => {
        
      })
      .catch((error) => {
        console.error(`Error ${action}ing application:`, error);
      });
  };


  return (
    <div>
      <div className="pdf-viewer">
        <Card>
          <Card.Header>
            <Card.Title as="h5">
              Application Details{' '}
              <Button className="feather icon-thumbs-up" variant="outline-primary" onClick={() => handleAction(id, 'accept')}>
                Accept
              </Button>
              <Button className="feather icon-thumbs-down" variant="outline-danger" onClick={() => handleAction(id, 'reject')}>
                Reject
              </Button>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <dl className="dl-horizontal row">
                  <dt className="col-sm-4">Name</dt>
                  <dd className="col-sm-8">{applicantData.first_name} {applicantData.last_name}</dd>

                  <dt className="col-sm-4">Email</dt>
                  <dd className="col-sm-8">{applicantData.email}</dd>

                  <dt className="col-sm-4">Phone</dt>
                  <dd className="col-sm-8">{applicantData.phone_number}</dd>

                  <dt className="col-sm-4">linkedin_profile</dt>
                  <dd className="col-sm-8">{applicantData.linkedin_profile}</dd>
                </dl>
              </Col>

              <Col md={6}>
                <dl className="dl-horizontal row">
                  <dt className="col-sm-4">Application Date</dt>
                  <dd className="col-sm-8">{createdDate}</dd>

                  <dt className="col-sm-4">Job Title</dt>
                  <dd className="col-sm-8">{opportunityData.title}</dd>

                  <dt className="col-sm-4">Score</dt>
                  <dd className="col-sm-8">{score}</dd>
                </dl>
              </Col>
              
            </Row>
          </Card.Body>
        </Card>

        {pdfData && (
          <div>
            <p>ss</p>
            {/* PDF viewer using react-pdf */}
            <Document file={`data:application/pdf;base64,${pdfData}`} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationPreview;

import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf'; // Import PDF viewer components
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Import useParams to get the applicationId
import axios from 'axios';

const ApplicationPreview = () => {
  const { applicationId } = useParams(); // Get the applicationId from the route parameters
  const [applicantData, setApplicantData] = useState({});
  const [pdfData, setPdfData] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
 
  useEffect(() => {
    // Fetch applicant and PDF data based on the applicationId
    axios.get(`http://localhost:8000/api/application/${applicationId}/`)
      .then((response) => {
        const data = response.data;

        // Set the applicant data
        setApplicantData(data.applicant);

        // Decode the base64-encoded PDF data
        const decodedPdfData = atob(data.pdfData);

        // Set the decoded PDF data
        setPdfData(decodedPdfData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [applicationId]); // Include applicationId in the dependency array

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div>
      <div className="pdf-viewer">
        <Card>
          <Card.Header>
            <Card.Title as="h5">
              Candidate Details{' '}
              <Button className="feather icon-thumbs-up" variant="outline-primary"></Button>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <dl className="dl-horizontal row">
                  <dt className="col-sm-4">Name</dt>
                  <dd className="col-sm-8">{applicantData.full_name}</dd>

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
                  <dd className="col-sm-8">{applicantData.application_date}</dd>

                  <dt className="col-sm-4">Job Title</dt>
                  <dd className="col-sm-8">{applicantData.job_title}</dd>

                  <dt className="col-sm-4">Score</dt>
                  <dd className="col-sm-8">{applicantData.score}</dd>
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

import {React , useRef,useEffect,useState} from 'react';
import PdfPreview from './pdf-viewer';
import { Row, Col, Card, Button } from 'react-bootstrap';
 
 


const ApplicationPreview = 
() => {
  const pdfUrl='https://arxiv.org/pdf/quant-ph/0410100.pdf'
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
 
  function onDocumentLoadSuccess({numPages}){
    setNumPages(numPages);
    setPageNumber(1);
  }

    return (<div>

<div className="pdf-viewer">

   
        <Card>
          <Card.Header>
            <Card.Title as="h5">Candidate Details   <Button className=  'feather icon-thumbs-up'  variant={'outline-' + 'primary'}></Button></Card.Title>
          </Card.Header>
          <Card.Body>
          <Row>
          <Col md={6}>
            <dl className="dl-horizontal row">
              <dt className="col-sm-4">Name</dt>
              <dd className="col-sm-8">John Doe</dd>

              <dt className="col-sm-4">Email</dt>
              <dd className="col-sm-8">johndoe@example.com</dd>

              <dt className="col-sm-4">Phone</dt>
              <dd className="col-sm-8">123-456-7890</dd>

              <dt className="col-sm-4">Skills</dt>
              <dd className="col-sm-8">JavaScript, React, Node.js</dd>

              <dt className="col-sm-4">Experience</dt>
              <dd className="col-sm-8">5 years</dd>

              <dt className="col-sm-4">Education</dt>
              <dd className="col-sm-8">Bachelor's in Computer Science</dd>
            </dl>
  
      </Col>

      <Col md={6}>
   
            <dl className="dl-horizontal row">
              <dt className="col-sm-4">Application Date</dt>
              <dd className="col-sm-8">2023-10-14</dd>

              <dt className="col-sm-4">Job Title</dt>
              <dd className="col-sm-8">Software Engineer</dd>

              <dt className="col-sm-4">Score</dt>
              <dd className="col-sm-8">85%</dd>
            </dl>
  
      </Col>
      </Row>
      </Card.Body>
        </Card>

 
<PdfPreview pdfUrl={pdfUrl} />
 
    </div>

    </div>
    )
  };

export default ApplicationPreview;

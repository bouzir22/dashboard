import React, { useState } from 'react';
import { Document, Page } from  'react-pdf/dist/esm/entry.webpack';

const PdfPreview = ({ decodedPdfData }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div>
      <div className="pdf-viewer">
        <Document file={decodedPdfData} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};

export default PdfPreview;
 


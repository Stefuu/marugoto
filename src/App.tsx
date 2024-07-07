import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "./App.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  "node_modules/pdfjs-dist/build/pdf.worker.min.mjs";

const PDFViewer: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () =>
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages || 1));

  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pageNumber = parseInt(event.target.value, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= (numPages || 1)) {
      setPageNumber(pageNumber);
    }
  };

  return (
    <div>
      <Document
        file="/assets/marugoto.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
          Previous
        </button>
        <button
          onClick={goToNextPage}
          disabled={numPages === null || pageNumber >= numPages}
        >
          Next
        </button>
      </div>
      <div>
        <label>
          Page:
          <input
            type="number"
            value={pageNumber}
            onChange={handlePageChange}
            min={1}
            max={numPages || 1}
          />
        </label>
      </div>
      <div>
        Page {pageNumber} of {numPages}
      </div>
    </div>
  );
};

export default PDFViewer;

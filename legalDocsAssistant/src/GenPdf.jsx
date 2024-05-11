import { useRef } from 'react';
import jsPDF from 'jspdf';
import ReportTemplate from '../Templates/ReportTemplate';

function GenPdf() {
 const reportTemplateRef = useRef(null);

 const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'px',
    });

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save('document.pdf');
      },
    });
 };

 return (
    <div>
      <button onClick={handleGeneratePdf}>Generate PDF</button>
      <div ref={reportTemplateRef}>
        <ReportTemplate />
      </div>
    </div>
 );
}

export default GenPdf;

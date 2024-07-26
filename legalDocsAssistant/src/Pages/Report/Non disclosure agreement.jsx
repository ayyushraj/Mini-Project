/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_API } from '../../api';
import { useReactToPrint } from 'react-to-print';
import './ReportTemplate.css';

const NdaTemplate = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get(`${BASE_API}/response/getResponse/${id}`);
        console.log('Fetched responses:', response.data);
        setResponses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchResponses();
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching responses: {error.message}</div>;
  }

  const responseMap = {};
  responses.forEach(response => {
    responseMap[response.question] = response.response;
  });

  return (
    <div className="container flex justify-center flex-col">
      <button onClick={handlePrint} className="btn btn-primary mb-1">Download PDF</button>
      <div className="page-container" ref={componentRef}>
        <h1 className="title">NON-DISCLOSURE AGREEMENT (NDA)</h1>

        <p className="section">This Non-Disclosure Agreement is entered into as of <u>{responseMap[1] || '[Date]'}</u> by and between:</p>

        <div className="section">
          <h2>Disclosing Party</h2>
          <p><u>{responseMap[2] || '[Disclosing Party Name]'}</u>, located at "<u>{responseMap[3] || '[Disclosing Party Address]'}</u>"</p>
        </div>

        <div className="section">
          <h2>Receiving Party</h2>
          <p><u>{responseMap[4] || '[Receiving Party Name]'}</u>, located at "<u>{responseMap[5] || '[Receiving Party Address]'}</u>"</p>
        </div>

        <div className="section">
          <h2>1. Purpose</h2>
          <p>The purpose of this Agreement is to protect the confidential information that may be disclosed between the parties. {responseMap[6] || '[Purpose]'}</p>
        </div>

        <div className="section">
          <h2>2. Confidential Information</h2>
          <p>For the purposes of this Agreement, "Confidential Information" refers to all information disclosed by the Disclosing Party to the Receiving Party, whether in written, oral, or electronic form, that is designated as confidential or should reasonably be understood to be confidential given the context of disclosure. {responseMap[7] || '[Confidential Information]'}</p>
        </div>

        <div className="section">
          <h2>3. Obligations of Receiving Party</h2>
          <p>The Receiving Party agrees to:</p>
          <ul>
            <li className="list-item">Keep the Confidential Information confidential and not disclose it to any third parties without the Disclosing Party's prior written consent.</li>
            <li className="list-item">Use the Confidential Information solely for the purpose of evaluating or engaging in discussions concerning a potential business relationship.</li>
            <li className="list-item">Take all reasonable precautions to protect the confidentiality of the Confidential Information.</li>
          </ul>
        </div>

        <div className="section">
          <h2>4. Exclusions from Confidential Information</h2>
          <p>The obligations of confidentiality do not apply to information that:</p>
          <ul>
            <li className="list-item">{responseMap[9] || '[Exclusions]'}</li>
          </ul>
        </div>

        <div className="section">
          <h2>5. Term</h2>
          <p>This Agreement will commence on the date first written above and will continue until terminated by either party with thirty (30) days' written notice to the other party. {responseMap[10] || '[Term]'}</p>
        </div>

        <div className="section">
          <h2>6. Return of Materials</h2>
          <p>Upon termination of this Agreement, the Receiving Party agrees to return or destroy all materials containing Confidential Information and certify in writing that it has done so. {responseMap[11] || '[Return of Materials]'}</p>
        </div>

        <div className="section">
          <h2>7. No License</h2>
          <p>Nothing in this Agreement grants any license to the Receiving Party under any patent, trademark, or copyright of the Disclosing Party. {responseMap[12] || '[Governing Law]'}</p>
        </div>

        <div className="section">
          <h2>8. Governing Law</h2>
          <p>This Agreement shall be governed by and construed in accordance with the laws of the state of <u>{responseMap[13] || '[State]'}</u>.</p>
        </div>

        <div className="section">
          <h2>9. Entire Agreement</h2>
          <p>This Agreement constitutes the entire agreement between the parties regarding the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.</p>
        </div>

        <div className="section">
          <h2>IN WITNESS WHEREOF</h2>
          <p>The parties have executed this Agreement as of the date first written above.</p>
        </div>

        <p><br />
          <span className="underline">"{responseMap[2] || '[Disclosing Party Name]'}"</span>, Disclosing Party ___________</p>

        <p><br />
          <span className="underline">"{responseMap[4] || '[Receiving Party Name]'}"</span>, Receiving Party __________</p>
      </div>
    </div>
  );
};

export default NdaTemplate;

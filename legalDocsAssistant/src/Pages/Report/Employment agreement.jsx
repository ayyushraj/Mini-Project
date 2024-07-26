/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_API } from '../../api';
import { useReactToPrint } from 'react-to-print';
import './ReportTemplate.css';

const EmploymentAgreementTemplate = () => {
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
        <h1 className="title">EMPLOYMENT AGREEMENT</h1>

        <p className="section">This Employment Agreement is made on <u>{responseMap[1] || '[Date]'}</u> between:</p>

        <div className="section">
          <h2>Employer</h2>
          <p><u>{responseMap[2] || '[Employer Name]'}</u>, located at "<u>{responseMap[3] || '[Employer Address]'}</u>"</p>
        </div>

        <div className="section">
          <h2>Employee</h2>
          <p><u>{responseMap[4] || '[Employee Name]'}</u>, residing at "<u>{responseMap[5] || '[Employee Address]'}</u>"</p>
        </div>

        <div className="section">
          <h2>1. Position and Duties</h2>
          <p>The Employee agrees to work for the Employer in the position of <u>{responseMap[6] || '[Job Title]'}</u> and perform the duties and responsibilities as outlined in the job description.</p>
        </div>

        <div className="section">
          <h2>2. Compensation</h2>
          <p>The Employee will be compensated at a rate of <u>{responseMap[7] || '[Salary/Hourly Rate]'}</u> per <u>{responseMap[8] || '[Pay Period]'}</u>.</p>
        </div>

        <div className="section">
          <h2>3. Benefits</h2>
          <p>The Employee will be eligible for the following benefits:</p>
          <ul>
            {responseMap[9] && <li className="list-item">{responseMap[9]}</li>}
            {responseMap[10] && <li className="list-item">{responseMap[10]}</li>}
          </ul>
        </div>

        <div className="section">
          <h2>4. Term</h2>
          <p>This Agreement will commence on <u>{responseMap[12] || '[Start Date]'}</u> and will continue until terminated by either party with <u>{responseMap[13] || '[Notice Period]'}</u> notice.</p>
        </div>

        <div className="section">
          <h2>5. Confidentiality</h2>
          <p>The Employee agrees to keep confidential all proprietary and confidential information of the Employer.</p>
        </div>

        <div className="section">
          <h2>6. Termination</h2>
          <p>Either party may terminate this Agreement with or without cause, subject to the notice period outlined in Section 4.</p>
        </div>

        <div className="section">
          <h2>7. Governing Law</h2>
          <p>This Agreement shall be governed by and construed in accordance with the laws of the state of <u>{responseMap[14] || '[State]'}</u>.</p>
        </div>

        <div className="section">
          <h2>IN WITNESS WHEREOF</h2>
          <p>The parties have executed this Employment Agreement as of the date first written above.</p>
        </div>

        <p><br />
          <span className="underline">"{responseMap[2] || '[Employer Name]'}"</span>, Employer ___________</p>

        <p><br />
          <span className="underline">"{responseMap[4] || '[Employee Name]'}"</span>, Employee __________</p>
      </div>
    </div>
  );
};

export default EmploymentAgreementTemplate;

/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_API } from '../../api';
import { useReactToPrint } from 'react-to-print';
import './ReportTemplate.css';

const PowerOfAttorneyTemplate = () => {
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
        <h1 className="title">POWER OF ATTORNEY</h1>

        <p className="section">This Power of Attorney is made on <u>{responseMap[1] || '[Date]'}</u> by and between:</p>

        <div className="section">
          <h2>Principal</h2>
          <p><u>{responseMap[2] || '[Principal Name]'}</u>, residing at "<u>{responseMap[3] || '[Principal Address]'}</u>"</p>
        </div>

        <div className="section">
          <h2>Attorney-in-Fact</h2>
          <p><u>{responseMap[4] || '[Attorney-in-Fact Name]'}</u>, residing at "<u>{responseMap[5] || '[Attorney-in-Fact Address]'}</u>"</p>
        </div>

        <div className="section">
          <h2>1. Type of Power of Attorney</h2>
          <p>This is a <u>{responseMap[6] || '[Type]'}</u> Power of Attorney.</p>
        </div>

        <div className="section">
          <h2>2. Powers Granted</h2>
          <p>The Attorney-in-Fact is granted the following powers:</p>
          <ul>
            {responseMap[7] && <li className="list-item">{responseMap[7]}</li>}
          </ul>
        </div>

        <div className="section">
          <h2>3. Durability</h2>
          <p>This Power of Attorney is <u>{responseMap[8] === 'Yes' ? 'durable' : 'not durable'}</u>.</p>
        </div>

        <div className="section">
          <h2>4. Effective Date</h2>
          <p>This Power of Attorney becomes effective on <u>{responseMap[9] || '[Effective Date]'}</u>.</p>
        </div>

        <div className="section">
          <h2>5. Termination</h2>
          <p>This Power of Attorney will <u>{responseMap[10] === 'Yes' ? 'terminate' : 'not terminate'}</u> on <u>{responseMap[11] || '[Termination Date]'}</u>.</p>
        </div>

        <div className="section">
          <h2>6. Governing Law</h2>
          <p>This Power of Attorney shall be governed by and construed in accordance with the laws of the state of <u>{responseMap[12] || '[State]'}</u>.</p>
        </div>

        <div className="section">
          <h2>IN WITNESS WHEREOF</h2>
          <p>The parties have executed this Power of Attorney as of the date first written above.</p>
        </div>

        <p><br />
          <span className="underline">"{responseMap[2] || '[Principal Name]'}"</span>, Principal ___________</p>

        <p><br />
          <span className="underline">"{responseMap[4] || '[Attorney-in-Fact Name]'}"</span>, Attorney-in-Fact __________</p>
      </div>
    </div>
  );
};

export default PowerOfAttorneyTemplate;

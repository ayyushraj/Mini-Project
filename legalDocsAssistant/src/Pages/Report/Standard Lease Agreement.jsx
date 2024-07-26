/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_API } from '../../api';
import { useReactToPrint } from 'react-to-print';
import './ReportTemplate.css';

const ReportTemplate = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userState, setUserState] = useState('');
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

    const fetchState = async () => {
      try {
        const response = await axios.get(`${BASE_API}/auth/getUserDetails/${id}`);
        setUserState(response.data.state); 
      } catch (error) {
        console.error('Failed to fetch state:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
    fetchState();
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
    <div className="container mx-auto p-4 flex justify-center flex-col">
      <button onClick={handlePrint} className="btn btn-primary mb-1">Download PDF</button>
      <div className="page-container border border-dashed border-black p-4 bg-white" ref={componentRef}>
        <h1 className="text-2xl font-bold text-center mb-2">LEASE AGREEMENT</h1>

        <p className="mb-4">This Lease Agreement is made and effective on <u>{responseMap[1] || '[Date]'}</u>, by and between:</p>

        <div className="mb-4">
          <h2>Landlord</h2>
          <p><u>{responseMap[2] || '[Landlord\'s Full Name]'}</u>, located at "{responseMap[3]}"</p>
        </div>

        <div className="mb-4">
          <h2>1. Premises</h2>
          <p>Landlord hereby leases to Tenant and Tenant leases from Landlord the premises located at "<u>{responseMap[3] || '[Property Address]'}</u>" ("Premises") under the following terms and conditions.</p>
        </div>

        <div className="mb-4">
          <h2>2. Rent</h2>
          <p>Tenant agrees to pay Landlord as rent for the Premises the sum of Rs.<u>{responseMap[4] || '[Rent Amount]'}</u> per month, due on the day "<u>{responseMap[5] || '[Due Date]'}</u>" of each month. Rent shall be paid to "<u>{responseMap[2] || '[Landlord\'s Name]'}</u>" at "{responseMap[3]}", or at such other place as Landlord may designate in writing.</p>
        </div>

        <div className="mb-4">
          <h2>3. Security Deposit</h2>
          <p>Upon execution of this Lease, Tenant shall deposit with Landlord the sum of Rs.<u>{responseMap[6] || '[Security Deposit Amount]'}</u> as security for the full and faithful performance by Tenant of all terms of this Lease. The security deposit shall be returned to Tenant within "<u>{responseMap[7] || '[Number]'}</u>" days after the termination of this Lease, less any amount deducted for damages to the Premises or unpaid rent.</p>
        </div>

        <div className="mb-4">
          <h2>4. Utilities</h2>
          <p>Tenant shall be responsible for the payment of all utilities and services for the Premises, including but not limited to water, gas, electricity, telephone, and internet.</p>
        </div>

        <div className="mb-4">
          <h2>5. Use of Premises</h2>
          <p>The Premises shall be used and occupied by Tenant exclusively as a private single-family residence. Tenant shall comply with all laws, regulations, and ordinances applicable to the Premises.</p>
        </div>

        <div className="mb-4">
          <h2>6. Maintenance and Repairs</h2>
          <p>Tenant shall maintain the Premises in good condition and repair, ordinary wear and tear excepted. Tenant shall promptly notify Landlord of any conditions that require repair or maintenance. Landlord shall be responsible for major repairs and maintenance.</p>
        </div>

        <div className="mb-4">
          <h2>7. Alterations and Improvements</h2>
          <p>Tenant shall not make any alterations, additions, or improvements to the Premises without the prior written consent of Landlord.</p>
        </div>

        <div className="mb-4">
          <h2>8. Pets</h2>
          <p>"<u>{responseMap[9] || '[Pets policy]'}</u>"</p>
        </div>

        <div className="mb-4">
          <h2>9. Subletting and Assignment</h2>
          <p>"<u>{responseMap[10] || '[Subletting policy]'}</u>"</p>
        </div>

        <div className="mb-4">
          <h2>10. Entry by Landlord</h2>
          <p>Landlord shall have the right to enter the Premises at reasonable hours for the purpose of inspecting, making repairs or alterations, and showing the Premises to prospective tenants or purchasers, with prior notice to Tenant.</p>
        </div>

        <div className="mb-4">
          <h2>11. Default</h2>
          <p>If Tenant fails to comply with any of the terms of this Lease, Landlord may terminate the Lease and take possession of the Premises, subject to applicable law.</p>
        </div>

        <div className="mb-4">
          <h2>12. Governing Law</h2>
          <p>This Lease shall be governed by and construed in accordance with the laws of the state of {userState} "[State]".</p>
        </div>

        <div className="mb-4">
          <h2>13. Entire Agreement</h2>
          <p>This Lease constitutes the entire agreement between the parties and may not be modified except in writing signed by both parties.</p>
        </div>

        <div className="mb-4">
          <h2>IN WITNESS WHEREOF</h2>
          <p>The parties have executed this Lease as of the date first above written.</p>
        </div>

        <p><br />
          <span className="underline">"{responseMap[2] || '[Landlord\'s Name]'}"</span>, Landlord ___________</p>

        <p><br />
          <span className="underline">"{responseMap[8] || '[Tenant\'s Name]'}"</span>, Tenant
          __________</p>

        <div className="mb-4">
          <h2>Optional Addendums and Disclosures:</h2>
          <ul>
            <li>Lead-Based Paint Disclosure (for properties built before 1978)</li>
            <li>Move-in/Move-out Inspection Checklist</li>
            <li>Pet Addendum (if pets are allowed)</li>
            <li>Smoke Detector/Carbon Monoxide Detector Addendum</li>
            <li>Rules and Regulations Addendum</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportTemplate;

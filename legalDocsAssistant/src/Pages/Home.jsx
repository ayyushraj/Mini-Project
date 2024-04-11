import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Lease from './lease';
import Forms from './forms';
{/*import LeaseAgreementIcon from '../../assets/LeaseAgreementIcon.png';
import EvictionNoticeIcon from '../../assets/EvictionNoticeIcon.png';
import NDAIcon from '../../assets/NDAIcon.png';
import PowerOfAttorneyIcon from '../../assets/PowerOfAttorneyIcon.png';
import BillOfSaleIcon from '../../assets/BillOfSaleIcon.png';
import LastWillIcon from '../../assets/LastWillIcon.png';
import PdfBuilder from './pdfBuilder';*/}

const SquareComponent = ({ title, /*iconSrc,*/ route }) => {
    return (
       <Link to={route} style={SquareStyle}>
         <div className="square" style={ContentStyle}>
           {/*<div className="icon" style={iconStyle}>
             <img src={'../../assets/LeaseAgreementIcon.png'} alt='img'/>
           </div>*/}
           <div className='title'>{title}</div>
         </div>
       </Link>
    );
   };
   
const SquareStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: 'lightblue',
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  };

  const ContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  const iconStyle = {
    
    marginBottom: '5px',
  };

const Home = () => {
  return (
    <Router>
      <div className="container">
      <Routes>
            <Route path="/" element={<h2>Home</h2>} />
            <Route path="/lease-agreement" element={<Lease></Lease>} />

            <Route path="/eviction-notice" element={<h2>Eviction Notice Page</h2>} />
            <Route path="/nda" element={<h2>NDA Page</h2>} />
            <Route path="/power-of-attorney" element={<h2>Power of Attorney Page</h2>} />
            <Route path="/bill-of-sale" element={<h2>Bill of Sale Page</h2>} />
            <Route path="/last-will" element={<h2>Last Will Page</h2>} />
            <Route path="/forms/:docType/:state" element={<Forms></Forms>} />
            
            

      </Routes>    
        <div className="square-container">
        <Routes>
        <Route path="/" element={<SquareComponent title="Lease Agreement" /*iconSrc={<LeaseAgreementIcon />}*/ route="/lease-agreement" />} />
          {/*<SquareComponent title="Lease Agreement" icon={<LeaseAgreementIcon />} route="/lease-agreement" />
          <SquareComponent title="Eviction Notice" icon={<EvictionNoticeIcon />} route="/eviction-notice" />
          <SquareComponent title="NDA" icon={<NDAIcon />} route="/nda" />
          <SquareComponent title="Power of Attorney" icon={<PowerOfAttorneyIcon />} route="/power-of-attorney" />
          <SquareComponent title="Bill of Sale" icon={<BillOfSaleIcon />} route="/bill-of-sale" />
          <SquareComponent title="Last Will" icon={<LastWillIcon />} route="/last-will" />*/}
        </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Home;

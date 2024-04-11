import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Pages/Form';
import Lease from './Pages/Lease';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lease />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AccountDetail from './pages/AccountDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/account/:id" element={<AccountDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

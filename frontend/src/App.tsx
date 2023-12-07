import './App.css';
import { Button } from '@mui/material';
import { Route, Routes } from 'react-router';
import RequireAuth from './components/requireAuth';
import LogoutButton from './components/logoutButton';
import OpportunitiesPage from './pages/Opportunities';

function App() {
  const Home = (
    <RequireAuth>
      <LogoutButton />
    </RequireAuth>
  );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<OpportunitiesPage />} />
        <Route path="/contact" element={Home} />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import { Button } from '@mui/material';
import { Route, Routes } from 'react-router';
import RequireAuth from './components/requireAuth';

function App() {
  const Home = (
    <RequireAuth>
      <Button>Contact</Button>
    </RequireAuth>
  );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Button>Home</Button>}></Route>
        <Route path="/contact" element={Home} />
      </Routes>
    </div>
  );
}

export default App;

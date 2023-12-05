import './App.css';
import { Button } from '@mui/material';
import { Route, Routes } from 'react-router';
import RequireAuth from './components/requireAuth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Button>Home</Button>}></Route>
        <Route
          path="/contact"
          element={
            <RequireAuth>
              <Button>Contact</Button>
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Landing, User } from './components';

function App() {
  return (
    <Router>
      <div className="f">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

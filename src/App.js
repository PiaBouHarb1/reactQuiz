
import './App.css';
import LogIn from './Client/Pages/LogIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from '../src/Client/Pages/SignUp';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Welcome from '../src/Client/Pages/Welcome';
import axios from 'axios';

function App() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return (
    <Router>
    <div className="App">
      <main className='content'>
      <Routes>
          <Route exact path='/' element={<Welcome/>}/>
        </Routes>
        <Routes>
          <Route exact path='/login' element={<LogIn />}/>
        </Routes>
        <Routes>
          <Route exact path='/signup' element={<SignUp />}/>
        </Routes>
      </main>
    </div>
  </Router>
  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage';
import MessagePortal from './Pages/MessagePortal';
import UserProfile from './Pages/UserProfie';
import Network from './Pages/Network';
// import { userDemo } from './constants';
import Register from './Pages/Register';


function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/message" element={<MessagePortal />} />
      <Route path="/userprofile" element={<UserProfile  />} />
      <Route path="/network" element={<Network/>} />
      <Route path="/register" element={<Register />} />
    </Routes>

  )
}

export default App

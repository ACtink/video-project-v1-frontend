import HomePage from './pages/HomePage.jsx'
import './App.css'
import Header from './components/Header.jsx'
import JoinPage from './pages/JoinPage.jsx'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import TestPage from './pages/TestPage.jsx';
import UserProfile from './components/UserProfile.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/profile/:username" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



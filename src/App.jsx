import HomePage from './pages/HomePage.jsx'
import './App.css'
import Header from './components/Header.jsx'
import JoinPage from './pages/JoinPage.jsx'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import TestPage from './pages/TestPage.jsx';
import UserProfile from './components/UserProfile.jsx';
import Layout from './pages/Layout.jsx';
import VideoView from './components/views/VideoView.jsx';
import ChatView from './components/views/ChatView.jsx';
import ProfileView from './components/views/ProfileView.jsx';
import EditProfile from './pages/EditProfile.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/test" element={<TestPage />} /> */}

          <Route path="/video" element={<VideoView />} />

          <Route path="/chat" element={<ChatView />} />

          <Route path="/profile" element={<ProfileView />} />

          <Route path="/profile/:username" element={<ProfileView />} />

          <Route path="/notifications" element={<NotificationsPage />} />

          <Route path="/edit-profile" element={<EditProfile />} />

          <Route path="*" element={<NotFoundPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



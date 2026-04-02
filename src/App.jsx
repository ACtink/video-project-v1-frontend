import HomePage from './pages/HomePage.jsx'
import './App.css'
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
import SettingsPage from './pages/SettingsPage.jsx';
import BlockedUsersPage from './pages/BlockedUsersPage .jsx';
import ChangePasswordPage from './pages/ChangePasswordPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import HiddenPostsPage from './pages/HiddenPostsPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/admin" element={<AdminPage />} />

          {/* <Route path="/test" element={<TestPage />} /> */}

          <Route path="/video" element={<VideoView />} />

          <Route path="/chat" element={<ChatView />} />

          <Route path="/profile" element={<ProfileView />} />

          <Route path="/profile/:username" element={<ProfileView />} />

          <Route path="/notifications" element={<NotificationsPage />} />

          <Route path="/edit-profile" element={<EditProfile />} />

          <Route path="/settings" element={<SettingsPage />} />

          <Route path="/settings/blocked" element={<BlockedUsersPage />} />
          <Route
            path="/settings/change-password"
            element={<ChangePasswordPage />}
          />

          <Route path="/settings/hidden-posts" element={<HiddenPostsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



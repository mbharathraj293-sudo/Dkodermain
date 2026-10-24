import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PlacementProvider } from './context/PlacementContext';
import AppShell from './components/layout/AppShell';

// 11 Dedicated Application Pages
import DashboardPage from './pages/DashboardPage';
import MissionPage from './pages/MissionPage';
import PracticePage from './pages/PracticePage';
import CodingPage from './pages/CodingPage';
import CareerPage from './pages/CareerPage';
import ChallengesPage from './pages/ChallengesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import PathfinderPage from './pages/PathfinderPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <PlacementProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="mission" element={<MissionPage />} />
            <Route path="practice" element={<PracticePage />} />
            <Route path="coding" element={<CodingPage />} />
            <Route path="career" element={<CareerPage />} />
            <Route path="career/:trackId" element={<CareerPage />} />
            <Route path="challenges" element={<ChallengesPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="opportunities" element={<OpportunitiesPage />} />
            <Route path="pathfinder" element={<PathfinderPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PlacementProvider>
  );
}

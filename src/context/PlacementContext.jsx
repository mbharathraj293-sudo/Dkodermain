import React, { createContext, useContext, useState, useEffect } from 'react';

const PlacementContext = createContext(null);

export function PlacementProvider({ children }) {
  // Student Profile
  const [user, setUser] = useState({
    name: 'Bharath Raj',
    email: 'bharath.raj@campus.edu',
    department: 'Computer Science & Engineering',
    college: 'National Institute of Technology',
    batch: 'Class of 2026',
    avatar: 'BR',
    role: 'Student Candidate',
  });

  // Target Placement Mission
  const [missionTarget, setMissionTarget] = useState({
    company: 'Amazon',
    pkg: '20+ LPA',
    language: 'Python',
    level: 'Intermediate',
    role: 'Software Development Engineer - 1 (SDE-1)',
  });

  // Telemetry & Readiness Indices
  const [readiness, setReadiness] = useState({
    overall: 74,
    status: 'Placement Eligible',
    breakdowns: {
      coding: 82,
      dsa: 79,
      consistency: 76,
      aptitude: 68,
      mock: 61,
    },
    weakestArea: {
      topic: 'Mock Assessments & Test Speed',
      score: 61,
      recommendation: 'Timed sectional tests to overcome speed bottlenecks',
      targetRoute: '/practice?tab=Mock',
    },
  });

  // Gamification Metrics
  const [xp, setXp] = useState(1840);
  const [streak, setStreak] = useState(7);
  const [problemsSolved, setProblemsSolved] = useState(48);
  const [mockTestsCompleted, setMockTestsCompleted] = useState(6);

  // Daily Challenge State
  const [dailyChallengeCompleted, setDailyChallengeCompleted] = useState(false);

  // Saved Opportunities IDs
  const [savedOpportunities, setSavedOpportunities] = useState(['opp-1', 'opp-3']);

  // App Shell UI State (Persistent Sidebar)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      const saved = localStorage.getItem('dkoder_sidebar_collapsed');
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('dkoder_sidebar_collapsed', JSON.stringify(isSidebarCollapsed));
    } catch {
      // safe fallback
    }
  }, [isSidebarCollapsed]);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Amazon SDE-1 OA Practice Set',
      description: 'New high-frequency question patterns have been matched to your target mission.',
      time: '12m ago',
      read: false,
      tag: 'Mission Target',
      type: 'target',
      route: '/practice',
    },
    {
      id: 'notif-2',
      title: 'Daily Challenge Bounty +120 XP',
      description: 'Array Rotation by K Positions is active. 15 minutes estimated.',
      time: '1h ago',
      read: false,
      tag: 'Bounty',
      type: 'challenge',
      route: '/challenges',
    },
    {
      id: 'notif-3',
      title: '7-Day Problem Solving Streak Active 🔥',
      description: 'You are in the top 8% consistency tier of your college batch.',
      time: 'Yesterday',
      read: true,
      tag: 'Achievement',
      type: 'streak',
      route: '/profile',
    },
    {
      id: 'notif-4',
      title: 'Flipkart GRiD 6.0 Hackathon',
      description: 'Registrations closing in 4 days. Campus interview waivers available.',
      time: '2d ago',
      read: true,
      tag: 'Opportunity',
      type: 'opportunity',
      route: '/opportunities',
    },
  ]);

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const toggleSaveOpportunity = (oppId) => {
    setSavedOpportunities((prev) =>
      prev.includes(oppId) ? prev.filter((id) => id !== oppId) : [...prev, oppId]
    );
  };

  const completeDailyChallenge = () => {
    if (!dailyChallengeCompleted) {
      setDailyChallengeCompleted(true);
      setXp((prev) => prev + 120);
      setProblemsSolved((prev) => prev + 1);
      // Trigger notification
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: 'Challenge Completed! +120 XP',
          description: 'Array Rotation submitted successfully with strict O(1) memory.',
          time: 'Just now',
          read: false,
          tag: 'XP Boost',
          type: 'xp',
          route: '/challenges',
        },
        ...prev,
      ]);
    }
  };

  const updateTarget = (newTarget) => {
    setMissionTarget((prev) => ({ ...prev, ...newTarget }));
  };

  return (
    <PlacementContext.Provider
      value={{
        user,
        missionTarget,
        updateTarget,
        readiness,
        setReadiness,
        xp,
        setXp,
        streak,
        setStreak,
        problemsSolved,
        mockTestsCompleted,
        dailyChallengeCompleted,
        completeDailyChallenge,
        savedOpportunities,
        toggleSaveOpportunity,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebar: () => setIsSidebarCollapsed((prev) => !prev),
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
      }}
    >
      {children}
    </PlacementContext.Provider>
  );
}

export function usePlacement() {
  const context = useContext(PlacementContext);
  if (!context) {
    throw new Error('usePlacement must be used within a PlacementProvider');
  }
  return context;
}

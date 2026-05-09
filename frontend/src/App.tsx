import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Shell from './components/layout/Shell';
import Dashboard from './pages/Dashboard';
import BatchUpload from './pages/BatchUpload';
import Trends from './pages/Trends';
import Hotels from './pages/Hotels';
import ReviewExplorer from './pages/ReviewExplorer';
import Reports from './pages/Reports';

const App: React.FC = () => {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/batch-upload" element={<BatchUpload />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/review-explorer" element={<ReviewExplorer />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Shell>
  );
};

export default App;

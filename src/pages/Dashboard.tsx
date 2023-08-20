import React from 'react';
import UserDashboard from '../components/dashboard/UserDashboard';

function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <UserDashboard />
      </div>
    </div>
  );
}

export default Dashboard;

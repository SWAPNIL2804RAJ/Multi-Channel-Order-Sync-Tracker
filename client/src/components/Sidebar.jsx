import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="w-48 bg-purple-700 text-white min-h-screen p-4">
    <h2 className="text-xl font-bold mb-6">Dashboard</h2>
    <nav className="flex flex-col gap-3">
      <Link to="/" className="hover:underline">Orders</Link>
      <Link to="/analytics" className="hover:underline">Analytics</Link>
    </nav>
  </div>
);

export default Sidebar;

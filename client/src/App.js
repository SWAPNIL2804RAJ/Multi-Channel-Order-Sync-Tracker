import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrdersPage from './pages/OrdersPage';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
        <div className="max-w-5xl mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                  <OrdersPage />
              }
            />
            <Route
              path="/analytics"
              element={
                <>
                  <AnalyticsPage />
                  <div className="flex justify-center gap-4 mt-6">
                    <Link
                      to="/"
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700"
                    >
                      📦 View All Orders
                    </Link>
                    
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

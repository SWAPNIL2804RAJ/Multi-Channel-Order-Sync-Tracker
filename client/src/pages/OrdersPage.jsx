import React, { useEffect, useState } from 'react';
import API from '../services/api';
import SyncButtons from '../components/SyncButtons';
import OrderTable from '../components/OrderTable';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleRetry = async (orderId) => {
    try {
      await API.post(`/retry/${orderId}`);
      alert(`Retry started for order ${orderId}`);
      fetchOrders();
    } catch (err) {
      alert(` ${err.response?.data?.error || 'Retry failed'}`);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-4">
        🚀 Multi-Channel Order Sync Tracker 🚀
      </h1>
      <div className="flex justify-center mb-4">
        <SyncButtons onSync={fetchOrders} />
      </div>

      {/* Buttons for navigation of pages*/}
        <div className="flex justify-center gap-4 mt-6">
            <Link
                to="/analytics"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 width to-100% "
            >
            📊 View Analytics
            </Link>
        </div>
        <br></br>
        <div className="bg-white rounded-2xl shadow-lg p-4">
        <OrderTable orders={orders} onRetry={handleRetry} />
      </div>
    </div>
  );
};

export default OrdersPage;

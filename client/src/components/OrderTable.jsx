import React, { useState } from 'react';
import API from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderTable = ({ orders, onSync }) => {
  const [search, setSearch] = useState('');

  const searchValue = (search || '').toLowerCase();

  const filteredOrders = orders.filter(order =>
    (order.orderId || '').toLowerCase().includes(searchValue) ||
    (order.channel || '').toLowerCase().includes(searchValue) ||
    (order.status || '').toLowerCase().includes(searchValue)
  );

  const handleRetry = async (orderId) => {
    try {
      const res = await API.post(`/retry/${orderId}`);
      toast.success(res.data.message || `Retry started for order ${orderId}`);
      onSync();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(`Retry failed: ${err.response.data.error}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-3xl font-bold text-purple-700 mb-4 text-center">Order Sync Dashboard</h1>

          <input
            type="text"
            placeholder="Search by ID, channel, status..."
            className="border border-gray-300 p-2 mb-4 w-full rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">ORDER ID</th>
                  <th className="p-3 text-left">CHANNEL</th>
                  <th className="p-3 text-left">ITEMS</th>
                  <th className="p-3 text-left">AMOUNT</th>
                  <th className="p-3 text-left">STATUS</th>
                  <th className="p-3 text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order.orderId} className="border-t">
                      <td className="p-3 font-medium">{order.orderId}</td>
                      <td className="p-3">{order.channel}</td>
                      <td className="p-3">{order.items?.join(', ')}</td>
                      <td className="p-3">₹{order.totalCost}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              order.status === 'success' ? 'bg-green-100 text-green-700' :
                              order.status === 'failed' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }
                          `}
                        >
                          {order.status ? order.status.toUpperCase() : 'UNKNOWN'}
                        </span>
                      </td>
                      <td className="p-3">
                        {order.status === 'failed' && (
                          <button
                            onClick={() => handleRetry(order.orderId)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600 text-xs"
                          >
                            Retry
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;

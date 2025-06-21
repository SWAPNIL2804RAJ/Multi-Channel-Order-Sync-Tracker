import React from 'react';

const OrderStats = ({ orders }) => {
  const total = orders.length;
  const success = orders.filter(o => o.status === 'success').length;
  const failed = orders.filter(o => o.status === 'failed').length;
  const pending = orders.filter(o => o.status === 'pending').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div className="bg-slate-100 rounded-lg shadow p-4 text-center">
        <h2 className="text-xl font-bold text-gray-700">Total</h2>
        <p className="text-2xl text-purple-700">{total}</p>
      </div>
      <div className="bg-green-100 rounded-lg shadow p-4 text-center">
        <h2 className="text-xl font-bold text-gray-700">Success</h2>
        <p className="text-2xl text-green-600">{success}</p>
      </div>
      <div className="bg-yellow-100 rounded-lg shadow p-4 text-center">
        <h2 className="text-xl font-bold text-gray-700">Pending</h2>
        <p className="text-2xl text-yellow-600">{pending}</p>
      </div>
      <div className="bg-red-100 rounded-lg shadow p-4 text-center">
        <h2 className="text-xl font-bold text-gray-700">Failed</h2>
        <p className="text-2xl text-red-600">{failed}</p>
      </div>
    </div>
  );
};

export default OrderStats;

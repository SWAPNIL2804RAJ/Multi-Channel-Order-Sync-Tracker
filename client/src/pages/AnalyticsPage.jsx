import React, { useEffect, useState } from 'react';
import API from '../services/api';
import OrderStats from '../components/OrderStats';
import OrderChannelChart from '../components/ChannelChart';

const AnalyticsPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
        📊 Order Analytics
      </h1>
      <OrderStats orders={orders} />
      <div className="mt-6">
        <OrderChannelChart orders={orders} />
      </div>
    </div>
  );
};

export default AnalyticsPage;

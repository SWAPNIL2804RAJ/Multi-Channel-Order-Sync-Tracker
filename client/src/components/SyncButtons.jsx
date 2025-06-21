import React from 'react';
import API from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SyncButtons = ({ onSync }) => {
  const syncShopify = async () => {
    try {
      const res = await API.post('/sync/shopify');
      toast.success(res.data.message || '✅ Shopify order synced successfully');
      onSync();
    } catch (err) {
      console.error('Shopify sync failed', err);
      toast.error(err.response?.data?.error || '❌ Shopify sync failed');
    }
  };

  const syncAmazon = async () => {
    try {
      const res = await API.post('/sync/amazon');
      toast.success(res.data.message || '✅ Amazon order synced successfully');
      onSync();
    } catch (err) {
      console.error('Amazon sync failed', err);
      toast.error(err.response?.data?.error || '❌ Amazon sync failed');
    }
  };

  const syncEbay = async () => {
    try {
      const res = await API.post('/sync/ebay');
      toast.success(res.data.message || '✅ eBay order synced successfully');
      onSync();
    } catch (err) {
      console.error('eBay sync failed', err);
      toast.error(err.response?.data?.error || '❌ eBay sync failed');
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button
          onClick={syncShopify}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Sync Shopify Order
        </button>
        <button
          onClick={syncAmazon}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Sync Amazon Order
        </button>
        <button
          onClick={syncEbay}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Sync eBay Order
        </button>
      </div>
    </div>
  );
};

export default SyncButtons;

import React from 'react';
import API from '../services/api';

const SyncButtons = ({ onSync }) => {
  const syncShopify = async () => {
    try {
      await API.post('/sync/shopify');
      onSync(); 
    } catch (err) {
      console.error('Shopify sync failed', err);
      alert('Shopify sync failed');
    }
  };

  const syncAmazon = async () => {
    try {
      await API.post('/sync/amazon');
      onSync();
    } catch (err) {
      console.error('Amazon sync failed', err);
      alert('Amazon sync failed');
    }
  };

  const syncEbay = async () => {
    try {
      await API.post('/sync/ebay');
      onSync();
    } catch (err) {
      console.error('eBay sync failed', err);
      alert('eBay sync failed');
    }
  };

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={syncShopify}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Sync Shopify Order
      </button>
      <button
        onClick={syncAmazon}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Sync Amazon Order
      </button>
      <button
        onClick={syncEbay}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Sync eBay Order
      </button>
    </div>
  );
};

export default SyncButtons;

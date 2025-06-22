# Multi-Channel Order Sync Tracker

## Introduction  
The **Multi-Channel Order Sync Tracker** is a full-stack web application designed to help businesses track and manage orders from multiple sales channels like **Shopify**, **Amazon**, and **eBay**. The app allows users to sync orders from these platforms, monitor their status in real-time (success, failed, pending), and retry failed orders. Additionally, it offers a simple analytics dashboard to visualize order distribution across different channels.  
This project demonstrates real-world challenges such as API integration, deployment, CORS handling, and data visualization.

---

## Project Approach  
The project was tackled by breaking the problem down into smaller, manageable parts:

- Firstly I initially sketched, consisting of a dashboard for syncing and viewing orders, with a separate analytics page added later for insights.  
- Development began with setting up clean APIs and MongoDB models, followed by building the frontend to display data dynamically. Sync functions, retry logic, and polling mechanisms were implemented to enhance usability.  
- Key deployment considerations were addressed early on, including CORS configuration, use of environment variables, and optimization of the production build.

---

## Tech Stack  

- **Frontend**: React (with Tailwind CSS for styling)  
- **Backend**: Node.js, Express, MongoDB Atlas  
- **Deployment**: Vercel (frontend), Render (backend)

---

## Frontend Overview  
The frontend is built with **React** and styled using **Tailwind CSS**. It consists of two main pages:

### `App.js`  
Defines the routes:  
- `/` → Orders page (main dashboard for syncing & viewing orders)  
- `/analytics` → Analytics dashboard (visualizes order data)

### `index.js`  
This is the point where `ReactDOM.render` mounts the app.  
Uses **React Router** to switch between the Orders and Analytics pages.

### Components  
- `SyncButtons`: Allows syncing orders from Shopify, Amazon, and eBay.  
- Navigation buttons for switching between Orders and Analytics are placed below the sync controls.

---

## Orders Page (`OrdersPage.jsx`)  

Displays all orders with real-time updates. Features include:
- **Search functionality** (by ID, channel, and status)  
- **Status badges**: success, failed, pending  
- **Retry button** for failed orders  
- **Automatic polling** every few seconds to update order statuses so that it could be a little realistic

---

## Analytics Page (`AnalyticsPage.jsx`)  

It Displays summary metrics and a pie chart:
- **Summary Cards** :  
  - Total orders  
  - Successful orders  
  - Failed orders  
  - Pending orders  

- **Pie Chart** (via Recharts):  
    - Visualizes the distribution of orders across Shopify, Amazon, and eBay. The chart is interactive and updates with real-time data.

---

## Backend Overview  
The backend is powered by **Node.js + Express** and connects to **MongoDB Atlas**.

### `index.js`  

- Sets up the Express server with CORS, JSON parsing, and environment variable support  
- Connects to MongoDB using Mongoose  
- Routes all API requests under `/api` via `orderRoutes.js`  
- Includes a root GET route (`/`) to confirm the API is running

### `orderRoutes.js`  

Defines API endpoints:
- `POST /api/sync/shopify` → Create a mock Shopify order  
- `POST /api/sync/amazon` → Create a mock Amazon order  
- `POST /api/sync/ebay` → Create a mock eBay order  
- `POST /api/retry/:orderId` → Retry a failed order  
- `GET /api/orders` → Fetch all orders

### `orderController.js`  

Contains business logic for syncing, retrying, and fetching orders.  
Implements randomization so that it could simulate like real-world outcomes:

- **While Sync**:  
  - ~`60%` chance of `success`  
  - ~`40%` chance of `failure`  

- **While Retry**:  
  - ~`90%` chance of converting failed orders to `success`, simulating improved reliability.

---

## Mock Data and API  

Since real integrations with Shopify, Amazon, and eBay APIs were out of scope, So I made mock data of the orders.
### Example mock order:

json
{
  - "orderId": "AMZ123456",
  - "channel": "Amazon",
  - "items": ["item1", "item2"],
  - "totalCost": 499,
  - "status": "success"
}

### Sync Behavior:
- A random `orderId` is generated which is unique.
- Items and `totalCost` are randomly created using mock order.
- Status is set randomly using Math.random() function ~ `(60% success, 40% failure)`

### Retry Behavior:
- When retrying a failed order, it has a `90%` chance to succeed.

---

## API Endpoints  

- `POST /api/sync/shopify`  
- `POST /api/sync/amazon`  
- `POST /api/sync/ebay`  
- `POST /api/retry/:orderId`  
- `GET /api/orders`

---

## Analytics Page Summary  

- **Summary Cards**:  
  - Total Orders  
  - Successful Orders  
  - Failed Orders  
  - Pending Orders  

- **Pie Chart**:  
  - Distribution of orders by channel (Shopify, Amazon, eBay)  
  - Interactive and updates as data changes

---

## Deployment  

- **Frontend**: Deployed to Vercel → _frontend-url_  
- **Backend**: Deployed to Render → _backend-url_

CORS settings ensure that only the frontend URL is allowed to access the backend API.

---

## Future Improvements  

- Real integration with Shopify, Amazon, and eBay APIs.  
- User authentication and role-based access.
- WebSocket support for live status updates.
- Admin dashboard with detailed analytics and export functionality.

# DecodeVault — Persistent Resource & Inventory Management System

> **Industrial Training Kit — Project 3 (Database Integration & Persistence)**  
> *Powered by DecodeLabs | Batch: 2026*

---

## 📌 Project Overview

**DecodeVault** is a full-stack web application built to master state persistence and database integration. The project transitions away from volatile in-memory variables to permanent, reliable database storage, fulfilling all requirements of **Project 3 — Database Integration**.

It features a clean, responsive **React.js + Tailwind CSS** frontend connected via RESTful HTTP APIs to a **Node.js + Express.js** backend with persistent database storage (`decodevault.db`).

---

## ✨ Key Features

- **Full-Stack CRUD Operations**:
  - ➕ **CREATE (`POST /api/items`)**: Insert new inventory/resource items with strict schema validation.
  - 📖 **READ (`GET /api/items`)**: Retrieve item records from the database with live search and category filtering.
  - ✏️ **UPDATE (`PUT /api/items/:id`)**: Edit existing item records with auto-recalculated stock status.
  - 🗑️ **DELETE (`DELETE /api/items/:id`)**: Permanently purge records from database storage.
- **Data Longevity & Security**:
  - File-based persistent storage (`server/data/decodevault.db`) persisting data across server restarts and browser reloads.
  - Schema-level constraints (`required`, `unique`, `min: 0`).
  - Parameterized queries to prevent SQL/NoSQL injection vulnerabilities.
- **Automated Stock Status Calculation**:
  - 🟢 `In Stock` (Quantity ≥ 5)
  - 🟡 `Low Stock` (Quantity 1–4)
  - 🔴 `Out of Stock` (Quantity = 0)
- **Interactive UI Components**:
  - Live statistics dashboard cards (Total Items, Stock Status Breakdown, Total Vault Valuation).
  - Search input & category filter toolbar.
  - Interactive Form Modal for creating & updating items.
  - Delete Confirmation Modal.
  - Animated Toast Notifications for success/error feedback.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js (via Vite) + Tailwind CSS + Lucide Icons |
| **Backend** | Node.js + Express.js |
| **Database** | Persistent File Datastore (`decodevault.db`) / MongoDB |
| **API Protocol** | RESTful HTTP (JSON) |
| **Tooling** | Concurrently, Nodemon |

---

## 📁 Project Architecture & Folder Structure

```text
Industrial Training Kit project 3/
├── server/                          # Backend Application (Node.js & Express API)
│   ├── config/                      # Database configuration (db.js)
│   ├── models/                      # Database Model & Schema rules (Item.js)
│   ├── controllers/                 # Business logic handlers (itemController.js)
│   ├── routes/                      # REST API Route definitions (itemRoutes.js)
│   ├── middleware/                  # Error handling middleware (errorHandler.js)
│   ├── data/                        # Persistent database storage directory (decodevault.db)
│   ├── test_backend.js              # Backend unit test suite
│   ├── e2e_full_test.js             # End-to-End integration test script
│   └── server.js                    # Express app entry point
│
├── client/                          # Frontend Application (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/              # Navbar, StatsCards, FilterBar, ItemTable, ItemModal, Toast
│   │   ├── services/                # API client functions (api.js)
│   │   ├── App.jsx                  # Main React container & state manager
│   │   ├── main.jsx                 # React DOM entry point
│   │   └── index.css                # Tailwind CSS styles
│   ├── index.html                   # HTML template
│   └── vite.config.js               # Vite config & API proxy setup
│
├── package.json                     # Root configuration for concurrent execution
└── README.md                        # Project documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **NPM** (v9 or higher)

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/yaseen126/Industrial-Training-Kit-project-3.git
cd Industrial-Training-Kit-project-3

# Install root, backend, and frontend dependencies
npm run install:all
```

### 3. Running the Application
Start both the **Backend API** (`http://localhost:5000`) and **React Frontend** (`http://localhost:3000`) with a single command:

```bash
npm run dev
```

Open your browser and navigate to:  
👉 **`http://localhost:3000`**

---

## 📡 REST API Documentation

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health Check | N/A |
| `GET` | `/api/items` | Fetch all items (supports `?search=` and `?category=`) | N/A |
| `GET` | `/api/items/:id` | Fetch single item by ID | N/A |
| `POST` | `/api/items` | Create new item | `{"name":"Wireless Keyboard", "category":"Electronics", "quantity":10, "price":49.99}` |
| `PUT` | `/api/items/:id` | Update existing item | `{"quantity":2, "price":45.00}` |
| `DELETE` | `/api/items/:id` | Delete item by ID | N/A |
| `POST` | `/api/items/seed` | Seed initial sample data | N/A |

---

## 🧪 Automated Testing

To run the automated backend test suite and full E2E verification:

```bash
cd server

# Run backend unit tests
node test_backend.js

# Run full End-to-End integration test
node e2e_full_test.js
```

---

## 📑 PDF Requirement Audit Matrix

| PDF Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **Backend connected with DB** | **PASSED** ✅ | Express server connects to `decodevault.db` on launch via `server/config/db.js`. |
| **Data Storage** | **PASSED** ✅ | Persistent file storage in `server/data/decodevault.db` preserving data across restarts. |
| **Data Retrieval** | **PASSED** ✅ | `GET /api/items` retrieves records and renders them in React `ItemTable.jsx`. |
| **Simple Database Schema** | **PASSED** ✅ | Mongoose/NeDB model (`server/models/Item.js`) storing name, category, quantity, price, status, timestamps. |
| **CRUD Operations** | **PASSED** ✅ | Full `CREATE`, `READ`, `UPDATE`, and `DELETE` endpoints implemented and tested. |
| **Proper Data Handling** | **PASSED** ✅ | Input validation (`min: 0`, `required`, `unique`), HTTP error codes (`400`, `404`), and injection protection. |

---

## 📜 License & Acknowledgments

Built for **DecodeLabs Industrial Training Kit — Project 3 (Batch 2026)**.

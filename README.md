# 🤝 WorkMate — Cooperative Gig Services Platform
### Smart India Hackathon (SIH 2026) | Problem Statement #26089
**Organization:** Ministry of Cooperation — National Council for Cooperative Training (NCCT)  
**Category / Theme:** Software / Agriculture, FoodTech & Rural Development  
**Tagline:** *“Verified services. Fair earnings. Collective welfare.”*

---

[![React 18](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC.svg)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Maps-Leaflet%20%2B%20OSM-199900.svg)](https://leafletjs.com/)
[![i18n](https://img.shields.io/badge/Localization-English%20%2B%20%E0%A4%B9%E0%A4%BF%E0%A4%A8%E0%A5%8D%E0%A4%A6%E0%A5%80-orange.svg)](https://react.i18next.com/)

---

## 📖 Overview
**WorkMate** is a cooperative-owned, mobile-first service marketplace that connects verified members of Labour Cooperative Societies and Federations with households and institutions that need local services. 

Unlike conventional gig economy platforms that charge steep commissions (20-30%) and offer no social security, WorkMate guarantees **90% direct earnings to workers**, **8% platform operation fee**, and **2% collective welfare pool** managed by cooperative federations.

---

## 🌟 Key Innovations & Features

1. **⚖️ Explainable Fair Matching Algorithm**:
   - Multi-factor scoring formula:
     $$\text{Score} = (0.35 \times \text{Skill}) + (0.25 \times \text{Distance}) + (0.20 \times \text{Availability}) + (0.10 \times \text{Rating}) + (0.10 \times \text{Fairness})$$
   - Ensures no single worker is overloaded while distributing earnings equitably across cooperative members.
   - Customers and admins see transparent match explanations.

2. **🗺️ Leaflet.js Real-Time GPS Tracking & Auto-Location**:
   - **Auto-Pickup (GPS)**: 1-click automatic location detection via HTML5 Geolocation + OpenStreetMap Nominatim reverse geocoding.
   - **Interactive Live Map**: Animated moving worker marker, route polyline, live distance calculation (in km), and dynamic ETA countdown.
   - **Worker GPS Navigation**: Turn-by-turn route preview, customer call action, and direct Google Maps trigger.

3. **💰 Transparent 90 / 8 / 2 Allocation Engine**:
   - **90%** Worker Direct Earnings
   - **8%** Cooperative Platform Operations
   - **2%** Social Security & Welfare Ledger (Health, accident insurance, and skill training)

4. **🛡️ Tri-Tier Worker Verification & Protection**:
   - Verification queue for cooperative society admins (e-Shram card, ITI trade certificate, Aadhaar, safety kit).
   - Ticket-based grievance redressal for payment disputes and rating appeals.

5. **🌐 Full Bilingual UI (English + हिन्दी)**:
   - Instant language switching across all customer, worker, and federation admin screens.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│               React 18 + Vite Frontend                  │
│       Tailwind CSS • Leaflet Maps • Recharts • i18n     │
└────────────────────────────┬────────────────────────────┘
                             │ HTTPS REST API + JWT
┌────────────────────────────▼────────────────────────────┐
│              Node.js + Express Backend API              │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Core Services:                                    │  │
│  │ • Explainable Fair Matching (35/25/20/10/10)      │  │
│  │ • 90/8/2 Allocation Ledger Engine                 │  │
│  │ • 7-Day Moving Average Demand Forecasting         │  │
│  │ • Geocoding & Haversine Distance Calculator       │  │
│  │ • Multi-role JWT Auth & Audit Trail Service       │  │
│  └───────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────┘
                             │ Mongoose ODM
┌────────────────────────────▼────────────────────────────┐
│                    MongoDB Database                     │
│  User • Cooperative • Worker • Booking • Payment        │
│  WelfareLedger • Rating • Grievance • AuditLog          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔑 Pre-Configured Demo Accounts

| Role | Email | Password | Primary Demo Flow |
|---|---|---|---|
| **Customer** | `customer.demo@workmate.test` | `Demo@123` | Search categories, test GPS pickup, book service, inspect match reasons, checkout, live Leaflet tracking |
| **Worker** | `worker.demo@workmate.test` | `Demo@123` | Availability toggle, accept gigs, open GPS turn-by-turn route, update status, view 2% welfare ledger |
| **Society Admin** | `admin.demo@workmate.test` | `Demo@123` | Verify worker queue, audit work orders, monitor welfare contributions, demand forecast charts |

---

## ⚡ Quick Start (Local Setup)

### Prerequisites
- Node.js 18+
- MongoDB (Local or Atlas)
- Git & npm

### 1. Clone & Install
```bash
git clone https://github.com/princesoni010/WorkMate.git
cd WorkMate

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment (`server/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/workmate
JWT_SECRET=workmate_super_secret_jwt_key_sih_2026_cooperative
CLIENT_URL=http://localhost:5173
```

### 3. Seed Demo Data
```bash
cd server
npm run seed
```

### 4. Run Both Servers
```bash
# Terminal 1: Start Backend API (Port 5000)
cd server
npm run dev

# Terminal 2: Start Frontend Web App (Port 5173)
cd client
npm run dev
```

---

## 📡 API Endpoints Reference

| Module | Method | Endpoint | Description |
|---|---|---|---|
| **Auth** | `POST` | `/api/auth/register` | Register customer / worker / admin |
| **Auth** | `POST` | `/api/auth/login` | JWT Login & role session |
| **Auth** | `GET` | `/api/auth/me` | Current authenticated user |
| **Workers**| `GET` | `/api/workers` | Public verified worker search (with geo filters) |
| **Workers**| `GET` | `/api/workers/me/jobs` | Assigned jobs for worker |
| **Workers**| `GET` | `/api/workers/me/earnings` | Worker earnings & welfare balance |
| **Bookings**| `POST` | `/api/bookings` | Create booking + auto fair matching |
| **Bookings**| `GET` | `/api/bookings/my` | User's bookings list |
| **Bookings**| `PATCH`| `/api/bookings/:id/status` | Update booking status lifecycle |
| **Payments**| `POST` | `/api/payments/verify` | Process 90/8/2 payment allocation |
| **Ratings**| `POST` | `/api/ratings` | Rate completed service (1-5 stars) |
| **Admin** | `GET` | `/api/admin/dashboard` | Federation KPI metrics & stats |
| **Admin** | `PATCH`| `/api/admin/workers/:id/verify` | Approve / Reject worker verification |
| **Admin** | `GET` | `/api/admin/forecast` | Demand forecast by locality |

---

## 📁 Repository Structure

```
WorkMate/
├── client/                     # React 18 + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Button, Input, Card, Modal, Loader, StatusBadge
│   │   │   ├── layout/         # Navbar, Sidebar, BottomNav, ProtectedRoute
│   │   │   ├── booking/        # TrackingMap, LocationPickerMap, ServiceCard, WorkerCard
│   │   │   ├── worker/         # WorkerNavigationMap, JobRequestCard, EarningsCard
│   │   │   └── admin/          # MetricCard, DataTable, DemandChart
│   │   ├── context/            # AuthContext, LanguageContext
│   │   ├── locales/            # en.json, hi.json (Full i18n Localization)
│   │   ├── pages/
│   │   │   ├── public/         # LandingPage, LoginPage, RegisterPage
│   │   │   ├── customer/       # Home, Search, WorkerProfile, BookingForm, MyBookings, PaymentPage, CustomerProfile
│   │   │   ├── worker/         # WorkerRegister, WorkerHome, Jobs, Earnings, WorkerProfileView
│   │   │   └── admin/          # Dashboard, VerifyWorkers, AdminBookings, WelfareLedger, Grievances, Forecast
│   │   ├── services/           # Axios API Client Layer (auth, booking, worker, payment, admin, etc.)
│   │   └── utils/              # Geolocation, Date, Money, Constants
│   └── vercel.json             # Vercel SPA routing configuration
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/             # MongoDB connection, Razorpay config
│   │   ├── controllers/        # Auth, Worker, Booking, Payment, Rating, Grievance, Admin
│   │   ├── middleware/         # JWT Auth, Role Guard, Error Handler, ObjectId Validator
│   │   ├── models/             # 9 Mongoose Schemas (User, Worker, Cooperative, Booking, etc.)
│   │   ├── routes/             # Express API Routes
│   │   ├── seed/               # Demo Data Seeder (demoData.json, seedData.js)
│   │   ├── services/           # Fair Matching, 90/8/2 Split, Geocoding, Forecast, Audit Log
│   │   └── utils/              # JWT, Distance (Haversine), Constants, AsyncHandler
│   └── server.js               # Main Express Server Entry Point
├── .gitignore
├── .env.example
└── README.md
```

---

## 📜 License
Built for **Smart India Hackathon 2026** (Submission for Ministry of Cooperation — NCCT).  
All rights reserved.

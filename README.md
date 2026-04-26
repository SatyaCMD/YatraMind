<div align="center">
  <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" alt="React" width="60" />
  <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" alt="Node.js" width="60" />
  <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongodb/mongodb.png" alt="MongoDB" width="60" />
  
  <h1 align="center">YatraMind SuperApp</h1>
  
  <p align="center">
    <strong>A next-generation, AI-powered travel ecosystem for Flights, Trains, Buses, and Cabs.</strong>
  </p>

  <p align="center">
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" /></a>
    <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
  </p>
</div>

---

## 🌟 Executive Summary

Welcome to **YatraMind**, a powerful, modern, next-generation travel application engineered with Google's **Gemini AI**. YatraMind offers dynamic trip planning, class-specific ticket booking, seamlessly synchronized user profiles across multiple data caches, and native IRCTC-standard PDF invoice construction.

## 🚀 Key Features

- **Multi-Modal Transport Engine**: Effortlessly scale searches across Flights, Trains, Buses, and Cabs, executing fully dynamic class hierarchies (e.g. `1st AC`, `Sleeper AC`, `SUV`, etc.).
- **Interactive e-Ticketing**: Utilizes `jsPDF` and `qrcode` to generate enterprise-grade boarding passes injected with watermarks, randomized PNRs, and transaction identifiers offline.
- **AI-Powered Travel Intelligence**: Fully integrated with `@google/generative-ai`, instantly returning the absolute lowest market fare matrices based on complex contextual prompts.
- **Master Admin Control Panel**: A fully interactive `/admin` sub-engine loaded with database wipe-capabilities, cache flushing, and global "Force Offline" panic toggles.
- **Modern UX/UI Glassmorphism**: Complete Tailwinds system featuring custom animations, dynamic sub-nav unmounting, animated logout counts, and high-quality notification overlays.

---

## 🛠 Tech Stack Architecture

| Layer | Technologies | 
| ----- | ------------ |
| **Frontend Framework** | Next.js (App Router), React 18 |
| **State Management** | Redux Toolkit (`authSlice`, `uiSlice`) |
| **Styling & Assets** | Tailwind CSS, Framer Motion, Lucide-React |
| **PDF Subsystem** | jsPDF, qrcode |
| **Backend API** | Node.js, Express.js |
| **Database & ORM** | MongoDB, Mongoose |
| **Authentication** | Node Web Crypto API, JWT |
| **Intelligence** | Gemini 1.5-Flash (Google Generative AI) |

---

## 💻 Quick Start & Deployment

### 1. Prerequisites
Ensure you have the following installed locally:
* **Node.js** (v18+)
* **MongoDB** (Running on `mongodb://127.0.0.1:27017`)

### 2. Configure Environment Tokens
Locate the `backend/.env` file and verify the following absolute secrets are exported correctly:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/yatramind
JWT_SECRET=yatra_super_secret_key_2024
GEMINI_API_KEY=<insert-your-gemini-key>
```

### 3. Spin up the cluster
In the root directory of the application:
```bash
npm install
npm run dev
```
*This command invokes concurrently, perfectly binding the Express Core to Port 5000 and the React GUI to Port 3000.*

---

## 🔐 Role-Based Access Control (RBAC)

The infrastructure intelligently segments testing users.

**Standard User Profile:**
* Use the `/login` or `/signup` flow.
* You can book tickets, fetch intelligent data, and execute live PNR status lookups directly from your Profile Dashboard.

**System Administrator Profile:**
* Navigate manually to [`http://localhost:3000/admin`](http://localhost:3000/admin).
* Gain immediate authorization to override mock users, clear the global backend caching structures, or initiate the Master Killswitch to take the entire network offline in emergency situations.

---
<div align="center">
  <p><i>Engineered for the optimal booking experience mapping.</i></p>
</div>

<div align="center">

# 📈 Stonks

### Real-Time Stock Watchlist & Market Intelligence Platform

*A production-grade full-stack application demonstrating enterprise-level architecture, authentication, and real-time data integration*

<br/>

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)

 • [Architecture](#-architecture) • [Features](#-features) • [Tech Stack](#-tech-stack)

</div>

---

## 🎯 Project Overview

Stonks is a sophisticated stock market tracking application that enables users to search thousands of stocks, build personalized watchlists, and receive automated price alerts. Built with modern web technologies and production-ready patterns, this project showcases end-to-end ownership of product development.

**Why This Project Matters:**
- ✅ **Full-Stack Expertise** — Seamless integration of frontend, backend, database, and third-party APIs
- ✅ **Production Architecture** — Scalable design with proper error handling, caching, and security
- ✅ **Modern Stack Mastery** — Latest Next.js 15 patterns with Server Components and Server Actions
- ✅ **Real-World Complexity** — Authentication, background jobs, email notifications, and real-time data

---

## ✨ Features

### 🔐 **Secure Authentication**
- Email/password authentication with Better Auth
- Cookie-based sessions with MongoDB adapter
- Protected routes and API endpoints

### 🔍 **Intelligent Stock Search**
- Keyboard shortcut (⌘K / Ctrl+K) for instant search
- Debounced API calls with 300ms optimization
- Preloaded popular stocks for zero-latency UX
- Live results from Finnhub API

### 📊 **Personal Watchlist**
- Add/remove stocks with optimistic UI updates
- Duplicate-safe upserts with MongoDB compound indexes
- Real-time synchronization across sessions
- Clean, responsive table layout

### 🔔 **Automated Price Alerts**
- Background job orchestration with Inngest
- Configurable price thresholds (upper/lower bounds)
- Professional email templates with Nodemailer
- Retry logic and failure handling

### 📱 **Responsive Design**
- Mobile-first approach with Tailwind CSS
- shadcn/ui component library
- Dark theme with consistent design system
- Accessible keyboard navigation

---

## 🏗️ Architecture

```mermaid
graph TB
    A[Client: Next.js App Router] --> B[Server Components]
    A --> C[Route Handlers /api/*]
    B --> D[Server Actions]
    C --> E[MongoDB Atlas]
    D --> E
    C --> F[Finnhub API]
    D --> F
    G[Inngest] --> H[Background Jobs]
    H --> I[Email Service]
    H --> F
    E --> J[Indexes & Constraints]
```

**Key Design Decisions:**

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| **Auth** | Better Auth + MongoDB | Cookie-based sessions, scalable adapter pattern |
| **Database** | MongoDB + Mongoose | Flexible schema, compound indexes for uniqueness |
| **API** | REST Route Handlers | Clear boundaries, standard HTTP semantics |
| **Background Jobs** | Inngest | Reliable execution, built-in retries, observability |
| **Caching** | React `cache()` | Server-side memoization, 30-60min revalidation |

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![Next.js](https://img.shields.io/badge/-Next.js_15-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/-React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Better Auth](https://img.shields.io/badge/-Better_Auth-000000?style=flat-square)

### DevOps & Tools
![Vercel](https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel)
![Inngest](https://img.shields.io/badge/-Inngest-000000?style=flat-square)
![Git](https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white)

</div>

---

## 📸 Screenshots

<div align="center">

### Dashboard & Search
<img src="./docs/screenshots/dashboard.png" alt="Dashboard" width="800"/>
<img src="./docs/screenshots/search.png" alt="search.png" width="800"/>

*Real-time market data with intelligent search*
<br/><br/>

### Watchlist Management
<img src="./docs/screenshots/watchlist1.png" alt="Watchlist" width="800"/>
<img src="./docs/screenshots/watchlist2.png" alt="Watchlist" width="800"/>

*Personalized stock tracking with optimistic updates*
<br/><br/>

### Stock Details
<img src="./docs/screenshots/stonk.png" alt="Stock Detail" width="800"/>

*Comprehensive stock information and TradingView integration*
<br/><br/>

### Email Alerts
![demovideo](docs/screenshots/emailgif.gif)

*Professional price alert notifications*
</div>

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 18+ 
MongoDB Atlas account (or local MongoDB)
Finnhub API key (free tier available)
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/stonks.git
cd stonks
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create `.env.local`:

```env
# Database
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/stonks"

# Authentication
BETTER_AUTH_SECRET="generate-with-openssl-rand-base64-32"
BETTER_AUTH_URL="http://localhost:3000"

# Finnhub API
FINNHUB_API_KEY="your_finnhub_api_key"
NEXT_PUBLIC_FINNHUB_API_KEY="your_public_key"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="Stonks <noreply@stonks.com>"

# Inngest (optional for alerts)
INNGEST_EVENT_KEY="your_inngest_event_key"
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📡 API Reference

### Authentication
All endpoints require valid session cookie from Better Auth.

### Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/watchlist` | Fetch user's watchlist | - | `WatchlistItem[]` |
| `GET` | `/api/watchlist?symbol=AAPL` | Check if symbol exists | Query: `symbol` | `{ exists: boolean }` |
| `POST` | `/api/watchlist` | Add to watchlist (idempotent) | `{ symbol: string, company: string }` | `{ ok: boolean }` |
| `DELETE` | `/api/watchlist` | Remove from watchlist | `{ symbol: string }` | `{ ok: boolean }` |

**Example Request:**
```typescript
// Add to watchlist
const response = await fetch('/api/watchlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ symbol: 'AAPL', company: 'Apple Inc.' })
});
```

---

## 🎓 Technical Highlights

### 1. **Database Optimization**
```javascript
// Compound unique index prevents duplicates at DB level
WatchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });

// Idempotent upsert pattern
await Watchlist.updateOne(
  { userId, symbol },
  { $set: { company, addedAt: new Date() } },
  { upsert: true }
);
```

### 2. **Optimistic UI Pattern**
```typescript
// Instant feedback with rollback on error
const handleToggle = async () => {
  setIsInWatchlist(!isInWatchlist); // Optimistic update
  try {
    await mutateWatchlist();
  } catch (error) {
    setIsInWatchlist(isInWatchlist); // Revert on failure
    toast.error('Failed to update watchlist');
  }
};
```

### 3. **Server-Side Caching**
```typescript
export const searchStocks = cache(async (query: string) => {
  const data = await finnhubFetch(`/search?q=${query}`);
  return data;
}, {
  revalidate: 3600 // 1 hour cache
});
```

### 4. **Type Safety**
```typescript
// End-to-end type safety from API to UI
interface WatchlistItem {
  symbol: string;
  company: string;
  addedAt: Date;
  userId: string;
}

type ApiResponse = { data: WatchlistItem[] } | { error: string };
```


## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Environment Setup:**
1. Configure all environment variables in Vercel Dashboard
2. Connect MongoDB Atlas (whitelist Vercel IPs)
3. Enable automatic deployments from `main` branch

### Docker

```dockerfile
# Build and run with Docker
docker build -t stonks .
docker run -p 3000:3000 --env-file .env.local stonks
```

---

## 🔒 Security & Best Practices

- ✅ **Authentication:** Secure cookie-based sessions, httpOnly flags
- ✅ **Authorization:** User-scoped queries (all watchlist operations filtered by `userId`)
- ✅ **Input Validation:** Zod schemas for API request validation
- ✅ **Error Handling:** Never expose stack traces to client
- ✅ **Rate Limiting:** Debounced search, API request throttling
- ✅ **Environment Secrets:** All sensitive data in environment variables

---

## 🛣️ Roadmap

- [ ] **Real-time quotes** via WebSocket integration
- [ ] **Advanced charts** with technical indicators
- [ ] **Portfolio tracking** with P&L calculations
- [ ] **Social features** (shared watchlists, discussions)
- [ ] **Mobile apps** (React Native)
- [ ] **AI-powered insights** with market sentiment analysis

---

## 💡 Key Learnings

This project deepened my understanding of:

1. **Scalable Architecture** — Designing systems that grow from prototype to production
2. **Next.js 15 Patterns** — Server Components, Server Actions, and the App Router
3. **Database Design** — Modeling relationships, indexes, and constraints for performance
4. **Background Jobs** — Reliable async processing with Inngest




## 👨‍💻 About the Developer

**Madhavendranath**

Full-Stack Engineer | Building Production-Grade Web Applications

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/madhavendranath-s/)
[![Email](https://img.shields.io/badge/-Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:madhavendranaths@gmail.com)
<!-- [![Portfolio](https://img.shields.io/badge/-Portfolio-000000?style=flat-square&logo=safari&logoColor=white)](https://yourportfolio.com) -->


---

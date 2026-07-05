# 🎯 Job Tracker — AI-Powered Career Assistant

A full-stack job application tracker that helps students and job seekers organize their applications, identify skill gaps, improve their resumes, and prepare for interviews — all powered by AI.

**Live Demo:** [job-tracker-mu-sage.vercel.app](https://job-tracker-mu-sage.vercel.app/login)
**Backend API:** [job-tracker-qyzl.onrender.com](https://job-tracker-qyzl.onrender.com)
**Repository:** [github.com/aadityashirole/Job_Tracker](https://github.com/aadityashirole/Job_Tracker)

> ⚠️ Note: Backend is hosted on Render's free tier, which spins down after inactivity. The first request after idle time may take 30-50 seconds to respond.

---

## 📖 About

During placement season, students apply to dozens of companies with no organized way to track applications, no way to know if they're actually qualified for a role, and no easy way to prepare for interviews. **Job Tracker** solves this by combining application tracking with AI-powered career tools — all in one free platform.

---

## ✨ Features

- **📋 Kanban Application Tracking** — Drag-and-drop board to track applications from Applied → Shortlisted → Interview → Offer → Rejected
- **🤖 AI Gap Analyzer** — Paste any job description and instantly see which skills you have and which you're missing
- **📄 AI Resume Scorer** — Get a detailed score out of 100 with section-wise breakdown, strengths, and improvements
- **🎯 AI Interview Prep** — Generate role-specific technical, behavioral, and HR interview questions with insider tips
- **🔒 Secure Authentication** — JWT-based auth with bcrypt password hashing
- **📊 Dashboard Analytics** — Real-time stats on total applications, interviews, and offers

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- @hello-pangea/dnd (drag-and-drop Kanban)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcrypt for authentication

**AI**
- Groq API (Llama 3.1 models) — server-side only, keys never exposed to the client

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 🏗️ Architecture

```
React Frontend (Vercel)
        │
        ▼
Node.js + Express API (Render)
        │
        ├──► MongoDB Atlas (application data, users)
        │
        └──► Groq AI API (skill analysis, resume scoring, interview prep)
```

All AI API calls are routed through the backend rather than called directly from the browser, so API keys are never exposed to the client.

---

## 📁 Project Structure

```
Job_Tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/          # Login, Dashboard, AddJob, AI feature pages
│   │   ├── components/     # KanbanBoard and shared components
│   │   └── api.js          # API call helpers
│   └── .env.example
│
└── server/                 # Express backend
    ├── models/              # User and Job Mongoose schemas
    ├── routes/              # auth, jobs, ai routes
    ├── index.js
    └── .env.example
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- A MongoDB Atlas account (free tier works)
- A Groq API key ([console.groq.com](https://console.groq.com))

### 1. Clone the repo
```bash
git clone https://github.com/aadityashirole/Job_Tracker.git
cd Job_Tracker
```

### 2. Backend setup
```bash
cd server
npm install
```
Create a `.env` file in `server/`:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
PORT=5000
```
Run the server:
```bash
node index.js
```

### 3. Frontend setup
```bash
cd client
npm install
npm run dev
```
Visit `http://localhost:5173`

---

## 🔐 Security Notes

- Passwords are hashed with bcrypt before storage — plaintext passwords are never saved
- JWT tokens are used to authenticate protected routes
- All third-party API keys (Groq) are kept server-side only
- `.env` files are gitignored and never committed to version control

---

## 🗺️ Roadmap

- [ ] Email notifications for follow-up reminders
- [ ] Resume upload (PDF parsing) instead of plain text paste
- [ ] Weekly application goal tracking
- [ ] Dark/light theme toggle

---

## 👤 Author

**Aaditya Shirole**
B.Tech Computer Engineering Student
[GitHub](https://github.com/aadityashirole)

---

## 📄 License

This project is open source and available for learning purposes.
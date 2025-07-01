# 🤖 AI Learning Roadmap Generator

A full-stack intelligent learning assistant that helps users generate personalized AI learning roadmaps based on their goals, skill levels, experience, and time availability. The system leverages AI Agents to orchestrate multi-step planning using OpenAI Agents SDK and integrates with a modern ReactJS frontend.

---

## 🚀 Features

- ✨ Intelligent goal-based AI roadmap generation
- 🧠 Modular OpenAI Agent system using function tools
- 📊 Weekly planning with skill tracking & visualization support
- 🔍 Real-time YouTube & Web resource search APIs
- 📧 Twilio/Email integration for future notifications
- 🌐 FastAPI backend with MongoDB integration
- ⚡ Fully responsive React frontend built with TypeScript

---

## 🛠️ Tech Stack

### Backend:
- **FastAPI** – High-performance API framework
- **OpenAI Agent SDK** – Agent-based AI logic orchestration
- **MongoDB** – NoSQL database for profile & roadmap persistence
- **Async HTTP Clients** – For calling search APIs (YouTube, Serper.)

### Frontend:
- **React** – Dynamic, SEO-friendly UI framework
- **Tailwind CSS** – Modern utility-first styling
- **Framer Motion** – Smooth animations
- **TypeScript** – Strong typing for better scalability

---



## 📡 API Endpoints (FastAPI)

| Method | Endpoint                     | Description                       |
|--------|------------------------------|-----------------------------------|
| POST   | `/user`                      | Add a new user                    |
| GET    | `/user/{id}`                 | Get user by ID                    |
| POST   | `/learning-profile`          | Submit learning preferences       |
| GET    | `/learning-roadmap/latest`   | Get latest roadmap (dev only)     |



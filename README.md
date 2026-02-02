# Attendance Turborepo – Installation & Setup Guide

This repository is a **monorepo (Turborepo)** that contains **two backend services** working together:

1. **Node.js HTTP Backend** – business logic, database, attendance flow  
2. **Python FastAPI Face-Auth Service** – face detection & embedding extraction  

Both services are required for the system to work correctly.

---

## 🧠 Architecture Overview


- Node.js handles authentication, classes, students, attendance
- Python handles face recognition only
- Services communicate via HTTP (Axios → FastAPI)

---

## 📦 Prerequisites

Make sure the following are installed **before cloning**:

### System Requirements
- **Node.js ≥ 18**
- **pnpm ≥ 9**
- **Python 3.10.x (MANDATORY)**
- **Git**

> ⚠️ Python 3.11+ and 3.13 are **NOT supported** by `dlib`

---

## 📥 Clone the Repository

```bash
git clone https://github.com/<your-username>/attendance-turborepo.git
cd attendance-turborepo

## Repository Structure

attendance-turborepo/
├── apps/
│   ├── http/          # Node.js backend
│   └── face-auth/     # Python FastAPI service
├── packages/          # Shared packages (if any)
├── turbo.json
├── package.json
└── pnpm-lock.yaml

Install Node Dependencies (Root Level)
  pnpm install
  To run node server
  pnpm run dev

PART 2: Python Face-Auth Service Setup (apps/face-auth)

  Navigate to Python Service
    cd apps/face-auth

  Create Virtual Environment
    python -m venv venv

  Activate it:

    Windows
      venv\Scripts\activate
    Linux / macOS
      source venv/bin/activate

  Install Python Dependencies
    pip install -r requirements.txt


⚠️ First install may take time because dlib compiles native code.

  Run FastAPI Server
    uvicorn app.main:app --reload --port 8000

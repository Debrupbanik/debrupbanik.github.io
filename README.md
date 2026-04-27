# 📟 Portfolio Terminal Monorepo

> **High-Fidelity Cyber-Terminal Portfolio**  
> _Powered by Next.js 16 + Django 6 + Redis + Celery_

![Portfolio Preview](frontend/public/og-preview.png)

## 🌌 Overview
This monorepo contains a state-of-the-art developer portfolio designed with a "Terminal/Cyberpunk" aesthetic. It features a fully interactive CLI, real-time background animations (Binary Rain), and a robust backend for managing projects, experience, and system-wide analytics.

### ✨ Key Features
- **Interactive CLI**: A functional terminal with custom commands (`ls`, `whoami`, `sudo hire`, `clear`).
- **Binary Rain Background**: Hardware-accelerated canvas animation with reactive glitch effects.
- **Interactive Resume**: A dedicated `/resume` page that mirrors a high-fidelity system printout.
- **Dynamic Content**: Backend-driven projects, stack, and experience timelines.
- **System Monitoring**: Real-time analytics and status tracking via Django + Redis.
- **Boot Sequence**: A custom bios-style boot sequence on first load.

---

## 🛠️ Tech Stack

### Frontend (`/frontend`)
- **Framework**: Next.js 16 (App Router)
- **Animation**: Framer Motion
- **Styling**: TailwindCSS + Custom CRT/Glitch CSS
- **Interactions**: Web Speech API (Voice Control) + Custom Binary Cursor

### Backend (`/backend`)
- **Core**: Django 6 (REST Framework)
- **Database**: SQLite (Local) / PostgreSQL (Production)
- **Async Tasks**: Celery + Redis
- **Real-time**: Django Channels (WebSockets)
- **PDF Generation**: WeasyPrint

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Python 3.11+
- Redis (Optional for local, required for async tasks)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/Debrupbanik/portfolio-terminal.git
   cd portfolio-terminal
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 📟 Custom Commands
- `ls ./projects`: View all active developments.
- `experience`: Navigate to the professional timeline.
- `sudo hire debrup`: Trigger the hiring sequence (Redirects to Gmail).
- `help`: See all available system commands.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Debrupbanik">Debrup Banik</a></sub>
</div>

# SpecPulse

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Python Version](https://img.shields.io/badge/python-3.10%2B-blue)](https://www.python.org/)
[![Node Version](https://img.shields.io/badge/node-18.x-brightgreen)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.103.2-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)

**SpecPulse** is an autonomous, multi-agent product intelligence engine engineered for B2B Industrial Commerce. It leverages advanced Large Language Models (LLMs) to automatically extract, normalize, and classify dense technical specifications from raw product catalogs (PDFs) into structured, queryable data.

---

## 📖 Table of Contents

- [Architecture Overview](#-architecture-overview)
- [Key Features](#-key-features)
- [Prerequisites](#-prerequisites)
- [Local Development Setup](#-local-development-setup)
- [Environment Configuration](#-environment-configuration)
- [Deployment](#-deployment)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏗 Architecture Overview

SpecPulse employs a modern, decoupled client-server architecture designed for high availability, security, and asynchronous AI processing.

*   **Frontend Client (`apps/landing`)**: A blazing-fast Single Page Application built with **React** and **Vite**, styled with **Tailwind CSS**.
*   **API Gateway (`services/api`)**: A robust, asynchronous REST API powered by **FastAPI** (Python). It handles authentication, data validation, and orchestration.
*   **Asynchronous Workers (`services/api/src/worker.py`)**: Distributed task queues managed by **Celery** to process expensive LLM vision and extraction tasks without blocking the main event loop.
*   **Databases & Caching**: 
    *   **PostgreSQL**: Relational datastore for users, workspaces, and structured product data.
    *   **Redis**: In-memory data store used as a Celery message broker and for rate-limiting.
    *   **MinIO / S3**: Object storage for secure, persistent storage of uploaded PDF catalogs.
*   **Agentic Orchestration**: Multi-modal AI pipelines utilizing **Gemini 1.5 Pro** and **Groq**.

---

## ✨ Key Features

- **Multi-Agent PDF Extraction**: Automated vision-based extraction of technical tables and unstructured text.
- **Human-in-the-Loop (HITL)**: A dedicated workflow for human operators to review, resolve, and audit low-confidence AI extractions.
- **Workspace Isolation**: Multi-tenant architecture ensuring data boundaries between different organizational workspaces.
- **Enterprise-Grade Security**: JWT authentication, bcrypt password hashing, rigorous input sanitization, and strict rate-limiting.

---

## 🛠 Prerequisites

Ensure you have the following installed before proceeding:

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- [Node.js](https://nodejs.org/en/download/) (v18.0 or higher)
- [Python](https://www.python.org/downloads/) (3.10 or higher)
- [Git](https://git-scm.com/)

---

## 🚀 Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/haroon2109/SpecPulse.git
cd SpecPulse
```

### 2. Configure Environment Variables
Copy the template environment file and provide the required secrets (see [Environment Configuration](#-environment-configuration)):
```bash
cp .env.example .env
```

### 3. Start Core Infrastructure (Databases & Storage)
Spin up PostgreSQL, Redis, and MinIO locally using Docker Compose:
```bash
docker-compose up -d
```

### 4. Initialize the Backend
Navigate to the API directory, install dependencies, run migrations, and start the server:
```bash
cd services/api
pip install -r requirements.txt
alembic upgrade head
uvicorn src.main:app --reload --port 8000
```

### 5. Initialize the Celery Worker
In a new terminal window, start the background worker to process AI tasks:
```bash
cd services/api
celery -A src.worker.celery_app worker --loglevel=info
```

### 6. Start the Frontend Client
Navigate to the frontend directory, install dependencies, and start the Vite development server:
```bash
cd apps/landing
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## ⚙️ Environment Configuration

The application enforces strict environment variable management to prevent secret leakage. Refer to the `.env.example` file in the root directory for a comprehensive list of required variables.

Key variables include:
*   `DATABASE_URL`: Connection string for PostgreSQL.
*   `SECRET_KEY`: A cryptographically secure random string for JWT signing.
*   `GOOGLE_API_KEY` & `GROQ_API_KEY`: Required for LLM extraction agents.
*   `MINIO_*`: Credentials for S3-compatible object storage.

> **Note:** The backend will gracefully fail on startup if critical security variables are missing from the environment.

---

## ☁️ Deployment

SpecPulse includes Infrastructure-as-Code (IaC) configuration files for automated deployment to modern cloud providers.

*   **Frontend (Vercel)**: The `apps/landing/vercel.json` file is configured with rewrite rules to support React Router SPAs. Simply connect the repository to Vercel and set the build command to `npm run build`.
*   **Backend (Render)**: The root `render.yaml` file is a complete blueprint. Connecting this repository to Render will automatically provision the managed PostgreSQL database, Redis instance, FastAPI Web Service, and Celery Worker service.

---

## 🛡 Security

Security is a first-class citizen in SpecPulse. The architecture implements the following protections:
- **Authentication**: Stateless JWT-based authentication with configurable expiry and secure password hashing via `passlib[bcrypt]`.
- **Abuse Protection**: Comprehensive rate-limiting on all API endpoints via `slowapi` (Redis-backed) to mitigate brute-force and DoS attacks.
- **Data Validation**: Strict input sanitization using Pydantic V2 models, ensuring all incoming payloads and file uploads are strictly typed and safe.
- **Authorization**: Endpoint-level dependency injection verifying resource ownership to prevent Insecure Direct Object Reference (IDOR) vulnerabilities.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

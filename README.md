# SpecPulse

An Autonomous, Multi-Agent Product Intelligence Engine for B2B Industrial Commerce.

## Architecture
- **Frontend:** Next.js (React) in `apps/web`
- **Backend:** FastAPI (Python) in `services/api`
- **Database:** PostgreSQL (structured data) & Vector DB (semantic search)
- **Agents:** CrewAI/LangGraph orchestration

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- Docker & Docker Compose

### Development
1. **Start Infrastructure:**
   ```bash
   docker-compose up -d
   ```
2. **Start Backend:**
   ```bash
   cd services/api
   pip install -r requirements.txt
   uvicorn src.main:app --reload --port 8000
   ```
3. **Start Frontend:**
   ```bash
   cd apps/web
   npm install
   npm run dev
   ```

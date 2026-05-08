# Lưu Bút — Fullstack Demo

> App sổ lưu bút tối giản: để lại tên + lời nhắn, danh sách hiển thị theo thứ tự mới nhất. Demo end-to-end một app fullstack từ code đến deploy, không có auth — vừa đủ chạm tới mọi tầng.

![CI](https://github.com/bochidung642-blip/guestbook/actions/workflows/ci.yml/badge.svg)

---

## Kiến trúc hệ thống

```mermaid
graph TB
    Browser["🌐 Browser"] --> FE["Next.js 15\n(TypeScript · Tailwind)"]
    FE -->|"REST API"| BE["FastAPI\n(Python)"]
    BE -->|"SQLAlchemy"| DB[("PostgreSQL")]
    BE -->|"Alembic"| DB

    subgraph Railway ["☁️ Railway (Production)"]
        FE
        BE
        DB
    end

    subgraph Local ["💻 Local (Docker Compose)"]
        FE2["Next.js :3000"]
        BE2["FastAPI :8000"]
        DB2[("Postgres :5432")]
        FE2 --> BE2 --> DB2
    end
```

---

## Demo trực tiếp

| Service     | URL                                                          |
|-------------|--------------------------------------------------------------|
| Frontend    | https://humorous-energy-production.up.railway.app            |
| Backend API | https://guestbook-production-86ab.up.railway.app             |
| API Docs    | https://guestbook-production-86ab.up.railway.app/docs        |

---

## Tech Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Frontend | Next.js 15 (App Router, TypeScript, Tailwind)   |
| Backend  | Python FastAPI                                  |
| Database | PostgreSQL                                      |
| Deploy   | Railway (monorepo, 3 services)                  |

---

## Cấu trúc repo

```
guestbook/                  ← monorepo
├── api/                    ← FastAPI backend
│   ├── app/
│   │   ├── main.py         ← FastAPI app + CORS
│   │   ├── models.py       ← SQLAlchemy models
│   │   ├── schemas.py      ← Pydantic schemas
│   │   ├── database.py     ← DB engine + session
│   │   └── routers/
│   │       └── entries.py  ← API endpoints
│   ├── alembic/            ← DB migrations
│   ├── requirements.txt
│   └── Procfile
└── web/                    ← Next.js frontend
    ├── app/
    │   ├── page.tsx        ← Main UI
    │   └── layout.tsx
    └── lib/
        └── api.ts          ← API client functions
```

---

## API Endpoints

| Method | Endpoint          | Mô tả                  |
|--------|-------------------|------------------------|
| GET    | `/entries/`       | Lấy tất cả entries     |
| POST   | `/entries/`       | Tạo entry mới          |
| DELETE | `/entries/{id}`   | Xóa entry theo id      |

**Schema — Entry:**
```json
{
  "id": 1,
  "name": "Nguyen Van A",
  "message": "Hello from guestbook!",
  "created_at": "2026-05-07T10:00:00"
}
```

---

## Chạy local

### Cách 1 — Docker Compose (khuyên dùng)

```bash
git clone https://github.com/bochidung642-blip/guestbook.git
cd guestbook
docker compose up --build
# Frontend → http://localhost:3000
# Backend  → http://localhost:8000
# API Docs → http://localhost:8000/docs
```

### Cách 2 — Thủ công

**Yêu cầu:** Python 3.11+, Node.js 18+, PostgreSQL

**Backend:**
```bash
cd api
cp .env.example .env        # điền DATABASE_URL
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt
.venv/Scripts/alembic upgrade head
.venv/Scripts/uvicorn app.main:app --reload
# → http://localhost:8000
```

**Frontend:**
```bash
cd web
cp .env.local.example .env.local   # điền NEXT_PUBLIC_API_URL
npm install
npm run dev
# → http://localhost:3000
```

---

## Environment Variables

### Backend (`/api`)

| Variable       | Ví dụ                                        | Mô tả                        |
|----------------|----------------------------------------------|------------------------------|
| DATABASE_URL   | `postgresql://user:pass@host:5432/guestbook` | PostgreSQL connection string |
| CORS_ORIGINS   | `https://your-frontend.up.railway.app`       | Allowed origins (frontend)   |

### Frontend (`/web`)

| Variable            | Ví dụ                                    | Mô tả              |
|---------------------|------------------------------------------|--------------------|
| NEXT_PUBLIC_API_URL | `https://your-backend.up.railway.app`    | Backend Railway URL|

---

## Deploy lên Railway

Railway tự động build và deploy khi push lên GitHub.

| Service    | Root Directory | Start Command                                      |
|------------|----------------|----------------------------------------------------|
| backend    | `/api`         | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| frontend   | `/web`         | Next.js build tự động                              |
| PostgreSQL | —              | Railway managed                                    |

Chi tiết từng bước xem tại [`PLAN.md`](./PLAN.md).

---

## Lịch sử xây dựng

Toàn bộ cuộc trò chuyện giữa người dùng và Claude Code trong quá trình xây dự án này được lưu lại:

| File | Nội dung |
|------|----------|
| [`lich-su-tro-chuyen-fullstack.txt`](./lich-su-tro-chuyen-fullstack.txt) | Phần 1 — Ý tưởng → Chọn stack → Viết code |
| [`lich-su-tro-chuyen-fullstack-phan2.txt`](./lich-su-tro-chuyen-fullstack-phan2.txt) | Phần 2 — Deploy Railway → Push README với live URLs |

---

## License

[MIT](./LICENSE)

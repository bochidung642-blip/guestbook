# CLAUDE.md — Guestbook Project

## Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | Next.js 15 (App Router, TypeScript, Tailwind) |
| Backend  | Python FastAPI      |
| Database | PostgreSQL          |
| Deploy   | Railway             |

## Repo Structure

```
guestbook/
├── api/                  ← FastAPI backend
│   ├── app/
│   │   ├── main.py       ← FastAPI app + CORS
│   │   ├── models.py     ← SQLAlchemy models
│   │   ├── schemas.py    ← Pydantic schemas
│   │   ├── database.py   ← DB engine + session
│   │   └── routers/
│   │       └── entries.py
│   ├── alembic/          ← DB migrations
│   ├── requirements.txt
│   └── Procfile
└── web/                  ← Next.js frontend
    ├── app/
    │   ├── page.tsx      ← Main UI
    │   └── layout.tsx
    └── lib/
        └── api.ts        ← API client functions
```

## Environment Variables

### Backend (`/api`)
| Variable       | Description                        |
|----------------|------------------------------------|
| DATABASE_URL   | PostgreSQL connection string       |
| CORS_ORIGINS   | Comma-separated allowed origins    |

### Frontend (`/web`)
| Variable             | Description              |
|----------------------|--------------------------|
| NEXT_PUBLIC_API_URL  | Backend Railway URL      |

## API Endpoints

| Method | Endpoint          | Mô tả                        |
|--------|-------------------|------------------------------|
| GET    | `/entries`        | Lấy tất cả entries           |
| POST   | `/entries`        | Tạo entry mới                |
| DELETE | `/entries/{id}`   | Xóa entry theo id            |

## Deploy (Railway)

- **backend** service: Root directory = `/api`, chạy từ `Procfile`
- **frontend (web)** service: Root directory = `/web`, tự build Next.js
- **Postgres** service: Railway managed, inject `DATABASE_URL` vào backend

## Lưu ý khi phát triển

- CORS_ORIGINS phải trỏ đúng domain Railway của frontend
- Không commit file `.env` — dùng `.env.example` làm mẫu
- Shell mặc định là PowerShell (Windows); kiểm tra `node -v` trước khi chạy npm

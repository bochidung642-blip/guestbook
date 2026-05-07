# Guestbook — Fullstack Demo Plan

## Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | Next.js (App Router)|
| Backend  | Python FastAPI      |
| Database | PostgreSQL          |
| Deploy   | Railway             |

---

## Repo Structure

```
guestbook/                  ← monorepo (1 repo, 2 folders)
├── api/                    ← FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   └── routers/
│   │       └── entries.py
│   ├── alembic/
│   ├── requirements.txt
│   └── Procfile
└── web/                    ← Next.js frontend
    ├── app/
    │   └── page.tsx
    ├── lib/
    │   └── api.ts
    └── package.json
```

---

## Bước 1 — Backend (`/api`)

### 1.1 Setup project
- Tạo virtual environment
- Cài dependencies: `fastapi`, `uvicorn`, `sqlalchemy`, `alembic`, `psycopg2-binary`, `python-dotenv`
- Tạo file `requirements.txt`

### 1.2 Kết nối Database
- Cấu hình `database.py`: SQLAlchemy engine + session từ `DATABASE_URL`
- Tạo file `.env` với `DATABASE_URL`

### 1.3 Model & Schema
- `models.py`: SQLAlchemy model `Entry` (id, name, message, created_at)
- `schemas.py`: Pydantic schemas `EntryCreate`, `EntryRead`

### 1.4 Alembic Migration
- Init alembic
- Tạo migration đầu tiên cho bảng `entries`
- Run migration

### 1.5 API Endpoints
- `GET  /entries`      — lấy tất cả entries, mới nhất trước
- `POST /entries`      — tạo entry mới
- `DELETE /entries/{id}` — xóa entry theo id

### 1.6 CORS
- Cho phép origin từ frontend (dev: `localhost:3000`, prod: domain Railway)

---

## Bước 2 — Frontend (`/web`)

### 2.1 Setup project
- `npx create-next-app@latest web` với TypeScript + App Router + Tailwind

### 2.2 API Client
- `lib/api.ts`: các hàm `getEntries()`, `createEntry()`, `deleteEntry()` gọi tới FastAPI

### 2.3 UI (`app/page.tsx`)
- Hiển thị danh sách entries (mới nhất trên đầu)
- Form nhập tên + tin nhắn → submit gọi `POST /entries`
- Nút xóa từng entry → gọi `DELETE /entries/{id}`
- Tự động refresh danh sách sau mỗi thao tác

---

## Bước 3 — Deploy lên Railway

### 3.1 Chuẩn bị
- Push code lên GitHub (1 repo duy nhất)
- Đảm bảo `Procfile` trong `/api`: `web: uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Đảm bảo Next.js build pass: `npm run build`

### 3.2 Tạo Railway Project
- Đăng nhập Railway → New Project → Deploy from GitHub repo

### 3.3 Deploy PostgreSQL
- Add service: Database → PostgreSQL
- Railway tự tạo `DATABASE_URL`

### 3.4 Deploy Backend (`/api`)
- Add service → GitHub repo → Root Directory: `/api`
- Environment variables:
  - `DATABASE_URL` — copy từ PostgreSQL service
- Railway tự chạy migration (hoặc chạy thủ công qua Railway CLI)

### 3.5 Deploy Frontend (`/web`)
- Add service → GitHub repo → Root Directory: `/web`
- Environment variables:
  - `NEXT_PUBLIC_API_URL` — URL của backend service trên Railway

### 3.6 Test end-to-end
- Mở domain Railway của frontend
- Thêm entry → kiểm tra hiển thị
- Xóa entry → kiểm tra cập nhật
- Kiểm tra DB trực tiếp qua Railway console

---

## API Reference

| Method | Endpoint          | Body                        | Response          |
|--------|-------------------|-----------------------------|-------------------|
| GET    | `/entries`        | —                           | `EntryRead[]`     |
| POST   | `/entries`        | `{ name, message }`         | `EntryRead`       |
| DELETE | `/entries/{id}`   | —                           | `{ success: true }`|

### EntryRead Schema
```json
{
  "id": 1,
  "name": "Nguyen Van A",
  "message": "Hello from guestbook!",
  "created_at": "2026-05-07T10:00:00"
}
```

---

## Environment Variables

### `/api`
| Variable      | Example                                      |
|---------------|----------------------------------------------|
| DATABASE_URL  | `postgresql://user:pass@host:5432/guestbook` |

### `/web`
| Variable              | Example                              |
|-----------------------|--------------------------------------|
| NEXT_PUBLIC_API_URL   | `https://api-xxx.up.railway.app`     |

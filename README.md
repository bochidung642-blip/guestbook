# Guestbook — Fullstack Demo

App tối giản dạng "sổ lưu bút": ai cũng để lại được tên + lời nhắn, danh sách hiển thị mới nhất ở trên.

Mục tiêu: demo end-to-end xây + deploy 1 app fullstack cho người khác tham khảo. Không có auth — vừa đủ chạm tới mọi tầng.

## Stack

| Layer    | Technology   |
|----------|--------------|
| Frontend | Next.js 15   |
| Backend  | FastAPI      |
| Database | PostgreSQL   |
| Deploy   | Railway      |

## Cấu trúc repo

```
guestbook/          ← monorepo
├── api/            ← FastAPI backend
└── web/            ← Next.js frontend
```

## Demo

| Service  | URL |
|----------|-----|
| Frontend | https://humorous-energy-production.up.railway.app |
| Backend API | https://guestbook-production-86ab.up.railway.app |

## Chạy local

### Backend
```bash
cd api
cp .env.example .env   # điền DATABASE_URL
.venv/Scripts/pip install -r requirements.txt
.venv/Scripts/alembic upgrade head
.venv/Scripts/uvicorn app.main:app --reload
```

### Frontend
```bash
cd web
cp .env.local.example .env.local
npm install
npm run dev
```

## Deploy

Xem `PLAN.md` để biết các bước deploy lên Railway.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import entries

app = FastAPI(title="Guestbook API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(entries.router)


@app.get("/")
def root():
    return {"status": "ok"}

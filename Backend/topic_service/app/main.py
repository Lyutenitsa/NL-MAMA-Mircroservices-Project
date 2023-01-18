import time

from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware

from app.routes import article_endpoints

app = FastAPI()

origins = [
    "*",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """
    Adding middleware for checking process time of each endpoint call
    """
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time-test"] = str(process_time)
    return response


@app.get("/")
async def root():
    return {"message": "Hello from topic service"}


app.include_router(article_endpoints.router)

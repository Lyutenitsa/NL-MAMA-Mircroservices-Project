from datetime import time

from fastapi import FastAPI, Request

from app.routes import article_endpoints

app = FastAPI(openapi_url="/articles/openapi.json",
              docs_url="/articles/docs")


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """
    Adding middleware for checking process time of each endpoint call
    """
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


@app.get("/")
async def root():
    return {"message": "Hello from article service"}


app.include_router(article_endpoints.router)

from fastapi import FastAPI
from app.routes import article_endpoints

app = FastAPI(openapi_url="/articles/openapi.json",
              docs_url="/articles/docs")


@app.get("/")
async def root():
	return {"message": "Hello from article service"}


app.include_router(article_endpoints.router)

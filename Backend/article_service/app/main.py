from fastapi import FastAPI
from app.routes import article_endpoints

app = FastAPI()


@app.get("/")
async def root():
	return {"message": "Hello World"}


app.include_router(article_endpoints.router)

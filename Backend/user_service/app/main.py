from fastapi import FastAPI
from app.routes import user_endpoints

app = FastAPI()


@app.get("/")
async def root():
	return {"message": "Hello World"}


app.include_router(user_endpoints.router)

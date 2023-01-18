from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.routes import user_endpoints, authEndpoints

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

@app.get("/")
async def root():
	return {"message": "Hello from user service"}




app.include_router(user_endpoints.router)
app.include_router(authEndpoints.router)
# main.py

from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.services import summarizer  
from app.routes import users, chats
from fastapi.middleware.cors import CORSMiddleware


 

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Loading summarizer model...")
    summarizer.load_summarizer("./app/localModels/bart-large-cnn")
    print("Model loaded.")
    yield
    print("Shutting down...")

app = FastAPI(lifespan=lifespan) 

# CORS config
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(chats.router)


 

@app.get("/")
def greet():
    return {"message": "Hello from FastAPI server"}

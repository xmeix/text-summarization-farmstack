from fastapi import FastAPI
from app.routes import users,chats
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.include_router(users.router)
app.include_router(chats.router)


origins = [
    "http://localhost:3000",
    "http://127.0.0.1/","http://127.0.0.1:8000/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#registers the user using his credentials
@app.get('/')
def greet():  
    return "hello to fast api server"
 
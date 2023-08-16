from fastapi import FastAPI
from app.routes import users
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(users.router)


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#registers the user using his credentials
@app.get('/')
def greet():  
    return "hello to fast api server"
 
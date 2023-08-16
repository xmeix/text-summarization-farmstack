from fastapi import FastAPI
from app.routes import users


app = FastAPI()
app.include_router(users.router)



#registers the user using his credentials
@app.get('/')
def greet():  
    return "hello to fast api server"
 
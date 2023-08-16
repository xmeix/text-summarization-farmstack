from pydantic import BaseModel, Field, EmailStr

class User(BaseModel):
    name: str = Field(..., min_length=3, max_length=40)
    email: EmailStr = (Field(default=None),)
    password: str = (Field(default=None),)
    
    
    
class UserLogin(BaseModel):
    email: EmailStr = (Field(default=None),)
    password: str = (Field(default=None),)
    
    
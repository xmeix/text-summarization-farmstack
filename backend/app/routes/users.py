from fastapi import APIRouter, HTTPException, status, Body
from ..models.users import User,UserLogin
from ..config.database import users_collection 
from bson import ObjectId 

router = APIRouter()



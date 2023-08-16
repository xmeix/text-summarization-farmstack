
from ...utils.utils import verify_password
from motor.motor_asyncio import AsyncIOMotorCollection
from fastapi import HTTPException
from ...config.database import users_collection
from ...controllers.auth.jwt_handler import generateJWT


async def authenticate_user(email: str, password: str):
    user = await users_collection.find_one({"email": email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password provided") 
    if not user or not verify_password(password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password provided")
    return generateJWT(str(user['_id']), email)

async def user_exists(email: str):
    user = await users_collection.find_one({"email": email})
    print(user)
    if not user:
        return False
    return True
 
from fastapi import APIRouter, HTTPException, status, Body
from ..models.users import User,UserLogin
from ..config.database import users_collection 
from bson import ObjectId 
from ..utils.utils import parse_json, hash_password
from ..controllers.auth.jwt_handler import generateJWT
from ..controllers.auth.auth import authenticate_user

router = APIRouter()



#registers the user using his credentials
@router.post('/user/',tags=['user'])
async def register_user(user: User):   
    email = parse_json(user.email)
    password = parse_json(user.password)  # Parse the password too

    if not email or not password:
        raise HTTPException(status_code=400, detail="Invalid email or password provided")
    
    hashed_password = hash_password(password)  # Hash the password

    user_dict = dict(user)
    user_dict['password'] = hashed_password  # Store the hashed password

    try:
        inserted_user = await users_collection.insert_one(user_dict)
        if inserted_user.inserted_id:
            print(email)
            return generateJWT(str(inserted_user.inserted_id), email)
        else:
            raise HTTPException(status_code=400, detail="Registration Failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post('/user/login/', tags=['user'])
async def user_login(login_data: UserLogin):
    email = parse_json(login_data.email)
    password = parse_json(login_data.password)

    if not email or not password:
        raise HTTPException(status_code=400, detail="Invalid email or password provided")
 
    token = await authenticate_user(email, password)
    if token:
        return token
    else:
        raise HTTPException(status_code=401, detail="Login failed")

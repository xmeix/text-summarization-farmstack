from fastapi import APIRouter, HTTPException, status, Body,Response
from ..models.users import User,UserLogin
from ..config.database import users_collection 
from bson import ObjectId 
from ..utils.utils import parse_json, hash_password
from ..controllers.auth.jwt_handler import generateJWT
from ..controllers.auth.auth import authenticate_user, user_exists


router = APIRouter()



#registers the user using his credentials
@router.post('/auth/register/',tags=['auth'])
async def user_register(response: Response,user: User):   
    email = parse_json(user.email)
    password = parse_json(user.password)  # Parse the password too

    if not email or not password:
        raise HTTPException(status_code=400, detail="Invalid email or password provided")
    
    user_does_exist = await user_exists(email)
    if user_does_exist:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed_password = hash_password(password)  # Hash the password

    user_dict = dict(user)
    user_dict['password'] = hashed_password  # Store the hashed password

    try:
        inserted_user = await users_collection.insert_one(user_dict)
        if inserted_user.inserted_id:
            token =  generateJWT(str(inserted_user.inserted_id), email)
            response.set_cookie("access_token", token["access_token"], httponly=True,secure=True)
            return token
        else:
            raise HTTPException(status_code=400, detail="Registration Failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post('/auth/login/', tags=['auth'])
async def user_login(response: Response,login_data: UserLogin):
    email = parse_json(login_data.email)
    password = parse_json(login_data.password)

    if not email or not password:
        raise HTTPException(status_code=400, detail="Invalid email or password provided")
 
    token = await authenticate_user(email, password)
    if token:
        response.set_cookie("access_token", token["access_token"], httponly=True,secure=False)
        return token
    else:
        raise HTTPException(status_code=401, detail="Login failed")



@router.post('/auth/logout/', tags=['auth'])
async def user_logout(response: Response):
    response.delete_cookie("access_token")  # Clear the access token cookie
    return {"message": "Logout successful"}
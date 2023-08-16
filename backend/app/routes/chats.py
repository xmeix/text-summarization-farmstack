from fastapi import APIRouter, HTTPException, status, Body,Response,Depends
from ..config.database import users_collection 
from bson import ObjectId
from app.controllers.auth.jwt_bearer import jwtBearer

router = APIRouter()

#get one chat by id
@router.get('/chats/{id}', dependencies=[Depends(jwtBearer())], tags=['chats'])
async def get_one_chat(response: Response,credentials: str = Depends(jwtBearer())):
    # we first verify the token
    if jwtBearer().verify_jwt(jwtoken=credentials):
        return {"message": "valid token"}
    raise HTTPException(status_code=403, detail="Unauthorized")


#get all the chats that exist
@router.get('/chats/', dependencies=[Depends(jwtBearer())], tags=['chats'])
async def get_all_chats(response: Response,credentials: str = Depends(jwtBearer())):
    # we first verify the token
    if jwtBearer().verify_jwt(jwtoken=credentials):
        return {"message": "valid token"}
    raise HTTPException(status_code=403, detail="Unauthorized")

#post a text and its summary in a specific chat
@router.post('/chats/{id}', dependencies=[Depends(jwtBearer())], tags=['chats'])
async def post_in_chat(response: Response,credentials: str = Depends(jwtBearer())):
    # we first verify the token
    if jwtBearer().verify_jwt(jwtoken=credentials):
        return {"message": "valid token"}
    raise HTTPException(status_code=403, detail="Unauthorized")




# # GET Posts
# @app.get("/posts", tags=["posts"])
# def getPosts():
#     return {"data": posts}


# # Get single post {id}
# @app.get("/posts/{id}", tags=["posts"])
# def getPost(id: int):
#     if id > len(posts):
#         return {
#             "error": 'post with ID: "{id}" does not exist',
#         }

#     for post in posts:
#         if post["id"] == id:
#             return {"data": post}

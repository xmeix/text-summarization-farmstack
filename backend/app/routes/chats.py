from fastapi import APIRouter, HTTPException, status, Body,Response,Depends
from ..config.database import users_collection,chats_collection
from bson import ObjectId
from app.controllers.auth.jwt_bearer import jwtBearer
from app.models.chats import Chat, TextSummary

router = APIRouter()

#get one chat by id
@router.get('/chats/{id}', dependencies=[Depends(jwtBearer())], tags=['chats'])
async def get_one_chat(response: Response,id: str,credentials: str = Depends(jwtBearer())):
    # we first verify the token
    if jwtBearer().verify_jwt(jwtoken=credentials):
        chat_object_id = ObjectId(id)
        chat = await chats_collection.find_one({"_id": chat_object_id})
        chat["_id"] = str(chat["_id"])
        if chat:
            return chat
        else:
            raise HTTPException(status_code=404, detail="Chat not found")

    raise HTTPException(status_code=403, detail="Unauthorized")


#get all the chats that exist
@router.get('/chats/', dependencies=[Depends(jwtBearer())], tags=['chats'])
async def get_all_chats(response: Response,credentials: str = Depends(jwtBearer())):
    # we first verify the token
    if jwtBearer().verify_jwt(jwtoken=credentials):
        all_chats = await chats_collection.find({}).to_list(length=None)
        # Convert ObjectId to string
        for chat in all_chats:
            chat["_id"] = str(chat["_id"])
        
        return all_chats
    raise HTTPException(status_code=403, detail="Unauthorized")

#post a text and its summary in a specific chat
@router.post('/chats/{id}', dependencies=[Depends(jwtBearer())], tags=['chats'])
async def post_in_chat(response: Response,id: str,text_summary: TextSummary = Body(...),credentials: str = Depends(jwtBearer())):
    # we first verify the token
    if jwtBearer().verify_jwt(jwtoken=credentials):
        chat_object_id = ObjectId(id)
        # Update the chat in MongoDB by adding the new text summary
        result = await chats_collection.update_one(
            {"_id": chat_object_id},
            {"$push": {"texts_summaries": text_summary.dict()}}
        )

        if result.modified_count > 0:
            return {"message": "Text summary added successfully"}
        else:
            raise HTTPException(status_code=404, detail="Chat not found")

    raise HTTPException(status_code=403, detail="Unauthorized")

#add a new chat
@router.post('/chats/', dependencies=[Depends(jwtBearer())], tags=['chats'])
async def create_chat(response: Response,title: str,credentials: str = Depends(jwtBearer())):
    # we first verify the token
    if jwtBearer().verify_jwt(jwtoken=credentials):
        result = await chats_collection.insert_one({"title": title})
        # Convert the ObjectId to string
        inserted_id = str(result.inserted_id)
        return {"inserted_id": inserted_id}
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

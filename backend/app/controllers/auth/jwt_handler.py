# signing, encoding , decoding jwts
import time
import jwt
from decouple import config
from pydantic import EmailStr
from fastapi import HTTPException


JWT_SECRET = config("JWT_SECRET")
JWT_ALGORITHM = config("ALGORITHM")


# function returns the generated tokens response(jwts)
def token_response(token: str):
    return {"access_token": token, "token_type": "Bearer"}

# function generate token using id and email
def generateJWT(userID: str, email: EmailStr):
    payload = {
        "userID": userID,
        "userEmail": email,
        "expiry": time.time() + 600, #10min
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(token)


def decodeJWT(token: str):
    try:
        decode_token = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)
        # return decode_token if decode_token("expires") >= time.time() else None
        return decode_token
    except jwt.exceptions.DecodeError:
        raise HTTPException(status_code=401,detail="Invalid token")
    except jwt.exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=401,detail="Token has expired")


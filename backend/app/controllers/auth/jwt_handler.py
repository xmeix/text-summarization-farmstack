# signing, encoding , decoding jwts
import time
import jwt
from decouple import config
from pydantic import EmailStr



JWT_SECRET = config("JWT_SECRET")
JWT_ALGORITHM = config("ALGORITHM")


# function returns the generated tokens response(jwts)
def token_response(token: str):
    return {"access token": token}

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
        return decode_token if decode_token("expires") >= time.time() else None
    except:
        return {}

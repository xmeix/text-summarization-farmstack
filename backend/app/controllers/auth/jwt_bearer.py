from typing import Optional
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.security.http import HTTPAuthorizationCredentials
from starlette.requests import Request
from .jwt_handler import decodeJWT

#this class __call__ method is triggered automatically.
class jwtBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(jwtBearer, self).__init__(
            auto_error=auto_error,
        )

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(
            jwtBearer, self
        ).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, details="Invalid or Expired Token!"
                )
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, details="Invalid or Expired Token!")

    def verify_jwt(self, jwtoken: str):
        isTokenValid: bool = False
        payload = decodeJWT(jwtoken)
        if payload:
            isTokenValid = True
        return isTokenValid





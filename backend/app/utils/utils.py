from passlib.context import CryptContext  # Import bcrypt's CryptContext
import json
from bson import json_util

# Initialize bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")  


def parse_json(data):
    return json.loads(json_util.dumps(data))


# Hash the password using bcrypt
def hash_password(password: str):
    return pwd_context.hash(password)
 


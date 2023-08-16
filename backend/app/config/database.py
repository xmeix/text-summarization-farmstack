import motor.motor_asyncio
from decouple import config



MONGO_URI = config("MONGO_URI")

# Create a new client and connect to the server
client = motor.motor_asyncio.AsyncIOMotorClient("mongodb+srv://xmeix:xmeix911@cluster0.zhtofdq.mongodb.net/?retryWrites=true&w=majority")


db = client.gptlike_database

users_collection = db["users"]


# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You have successfully connected to MongoDB!")
except Exception as e:
    print(e)
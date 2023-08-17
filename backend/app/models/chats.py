from pydantic import BaseModel, Field
from typing import List

class TextSummary(BaseModel):
    text: str 
    summary: str

class Chat(BaseModel):
    title: str
    texts_summaries: List[TextSummary] = (Field(default=None),)
    userId: str

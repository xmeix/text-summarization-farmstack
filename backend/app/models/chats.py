from pydantic import BaseModel, Field
from typing import List


class TextSummary(BaseModel):
    text: str
    summary: str

class Chat(BaseModel):
    texts_summaries: List[TextSummary]

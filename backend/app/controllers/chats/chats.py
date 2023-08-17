
from app.models.chats import TextSummary
from transformers import pipeline
from fastapi import HTTPException

async def get_summaried_text(text: str) -> TextSummary:
    # print(text)
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    try:
        # summarizer = pipeline("summarization")
        max_length = len(text)
        summary = summarizer(text, max_length=max_length, min_length=10, do_sample=False)
        # print(summary[0]['summary_text'])
        return TextSummary(text=text, summary=summary[0]['summary_text'])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
    
 
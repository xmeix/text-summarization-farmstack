
from app.models.chats import TextSummary
from transformers import pipeline
from fastapi import HTTPException

async def get_summarized_text(text: str, min_length: int, max_length: int, summary_diversity: bool) -> TextSummary:
    # print(text)text, min_length,max_length,do_sample
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    try:
        # min_length = max_length // 3  
        summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=summary_diversity)
        
        return TextSummary(text=text, summary=summary[0]['summary_text'])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    
    
 

from app.models.chats import TextSummary
from transformers import pipeline
from fastapi import HTTPException

async def get_summarized_text(text: str, min_length: int, max_length: int, summary_diversity: bool) -> TextSummary:
    # print(text)text, min_length,max_length,do_sample
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    
    summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=summary_diversity)
    summarized_text = summary[0]['summary_text']
    if not summarized_text.strip():
        raise HTTPException(status_code=400, detail="Summary could not be generated.")
    return TextSummary(text=text, summary=summarized_text)

    
    
 
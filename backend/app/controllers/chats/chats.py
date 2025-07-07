from fastapi import HTTPException
from app.models.chats import TextSummary
from app.services import summarizer 

async def get_summarized_text(text: str, min_length: int, max_length: int, summary_diversity: bool) -> TextSummary:
    if summarizer.model is None or summarizer.tokenizer is None:
        raise HTTPException(status_code=503, detail="Summarizer model not loaded yet.")

    inputs = summarizer.tokenizer([text], return_tensors="pt", truncation=True, max_length=1024)

    summary_ids = summarizer.model.generate(
        inputs["input_ids"],
        max_length=max_length,
        min_length=min_length,
        do_sample=summary_diversity,
        num_beams=4
    )

    summarized_text = summarizer.tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    if not summarized_text.strip():
        raise HTTPException(status_code=400, detail="Summary could not be generated.")
    
    return TextSummary(text=text, summary=summarized_text)

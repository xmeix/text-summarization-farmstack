# app/services/summarizer.py

from transformers import BartTokenizerFast, BartForConditionalGeneration


tokenizer = None
model = None

def load_summarizer(model_path="./localModels/bart-large-cnn"):
    global tokenizer, model
    tokenizer = BartTokenizerFast.from_pretrained(model_path)
    model = BartForConditionalGeneration.from_pretrained(model_path)
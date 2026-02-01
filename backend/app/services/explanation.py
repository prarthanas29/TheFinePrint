from google import generativeai as genai
import os
from dotenv import load_dotenv
from app.models.user_input import UserInput
from app.prompts.prompt import build_prompt 

load_dotenv()
print(f"DEBUG: Key starts with: {os.getenv('GEMINI_API_KEY')[:5]}...")
DOCUMENTS_FILE = "data/documents.txt"

def load_documents():
    with open(DOCUMENTS_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    docs = [doc.strip() for doc in content.split('\n\n') if doc.strip()]
    return docs

def filter_documents(docs, category, type=""):
    filtered = []
    for doc in docs:
        if category.lower() in doc.lower():
            filtered.append(doc)
    return filtered

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
# Configure genai with API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_explanation(user_input: UserInput):
    docs = load_documents()
    relevant_docs = filter_documents(docs, user_input.category)
    prompt = build_prompt(user_input.category, relevant_docs, user_input.tab)    
    model = genai.GenerativeModel('gemini-3-flash-preview')
    response = model.generate_content(prompt)
    
    return response.text
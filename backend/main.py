from fastapi import FastAPI
import os
from dotenv import load_dotenv  
import google.generativeai as genai
from app.models.user_input import UserInput
from app.prompts.prompt import build_prompt
from app.services.explanation import generate_explanation
from fastapi.middleware.cors import CORSMiddleware 

load_dotenv()

app =FastAPI()
# Now os.getenv will actually find your key
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

print(f"DEBUG: Key loaded? {'Yes' if api_key else 'No'}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def hello():
    return "The Fine Print"

@app.post("/explanation")
def explanation_endpoint(user_input: UserInput):
    explanation = generate_explanation(user_input)
    return {"explanation": explanation}


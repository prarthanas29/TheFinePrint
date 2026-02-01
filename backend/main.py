from fastapi import FastAPI
from app.models.user_input import UserInput
from app.prompts.prompt import build_prompt
from app.services.explanation import generate_explanation
from fastapi.middleware.cors import CORSMiddleware 


app =FastAPI()

@app.get("/")
def hello():
    return "The Fine Print"

@app.post("/explanation")
def explanation_endpoint(user_input: UserInput):
    explanation = generate_explanation(user_input)
    return {"explanation": explanation}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
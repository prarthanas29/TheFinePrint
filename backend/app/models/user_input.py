from typing import Optional
from pydantic import BaseModel

class UserInput(BaseModel):
    category: str
    tab: Optional[str] = "translation"
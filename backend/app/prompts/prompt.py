BASE_PROMPT = """
You are an AI assistant. The user is interested in the category: "{category}".
Based on the following documents, provide a concise summary that is relevant to the user's interests, who is really affected by this document and predicted future impacts based on these documents. 

Documents:
{documents}

Summary:
"""

def build_prompt(category: str, documents: list) -> str:
    docs_text = "\n\n".join(documents)
    return BASE_PROMPT.format(
        category=category,
        documents=docs_text
    )
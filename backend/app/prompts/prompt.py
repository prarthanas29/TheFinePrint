def build_prompt(category, relevant_docs, tab="translation"):
    context = "\n\n".join(relevant_docs) if relevant_docs else "No relevant documents found."
    
    if tab == "translation":
        return f"""
You are a policy translator helping everyday Americans understand government documents.

DOCUMENT/POLICY: {category}

CONTEXT:
{context}

Provide a clear translation that:

1. **SUMMARY (2-3 sentences)**: What is this document trying to do? Use simple language.

2. **WHO IT AFFECTS**: List specific groups of people this impacts.

3. **KEY CHANGES**: Break down the 3-5 most important changes in plain English.

4. **TIMELINE**: When do these changes take effect?

5. **BOTTOM LINE**: In one sentence, what's the single most important thing someone should know?

Use 8th grade reading level. No political bias - just facts.
"""
    
    elif tab == "predictions":
        return f"""
You are a policy analyst providing historical context for current government decisions.

CURRENT POLICY: {category}

CONTEXT:
{context}

Analyze this policy by finding historical precedents:

1. **SIMILAR PAST POLICIES**: Identify 2-4 similar policies from the past 20-50 years. For EACH provide:
   - Policy Name & Year
   - What it did (1 sentence)
   - What actually happened (outcomes)
   - Source (be specific)

2. **PATTERN ANALYSIS**: What patterns emerge? What worked? What didn't?

3. **EVIDENCE-BASED PREDICTION**: What are 2-3 plausible scenarios? Rate likelihood (High/Medium/Low).

4. **WHAT TO WATCH**: What are early indicators to watch for?

EVERY historical claim must include a specific source.
"""
    
    elif tab == "actions":
        return f"""
You are a civic engagement advisor helping people respond effectively to policy decisions.

POLICY: {category}

CONTEXT:
{context}

Provide evidence-based actions:

1. **IMMEDIATE ACTIONS (Next 7 days)** - 2-3 actions with:
   - What to do (specific steps)
   - Why it works (cite evidence)
   - Time required
   - Impact level

2. **MEDIUM-TERM ACTIONS (Next 30 days)** - Same format

3. **LONG-TERM ENGAGEMENT (Ongoing)** - 1-2 sustained actions

4. **RESOURCES**: 3-5 specific organizations/tools with why they're credible

Must be legal, accessible, non-partisan, and actionable.
"""
    
    return f"Explain this policy: {category}\n\nContext: {context}"
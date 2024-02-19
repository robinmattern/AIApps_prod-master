#!/bin/bash

cat << EOF > request.json
{
    "contents": [
        {
            "role": "user",
            "parts": [
                {
                    "text": "What model is this prompt being answered with?  Bard was your ChatCPT service.  It is now named Gemini, but that is also a brand name for many services.
What is the  name of LLM that you are using?
How do I save this prompt?  When I click on the left arrow next to the name of this prompt, it asks me if I want to save it?
Sorry, but there is no Save option on that menu.  And there is no Saved Prompts tab on the left sidebar.
Somehow a right sidebar has just appeared and it has a Save button and it says that the Model name is Gemini 1.0 Pro Vision."
                }
            ]
        }
    ],
    "generation_config": {
        "maxOutputTokens": 2048,
        "temperature": 0.4,
        "topP": 1,
        "topK": 32
    },
    "safetySettings": [
        { "category": "HARM_CATEGORY_HATE_SPEECH",       "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
        { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
        { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
        { "category": "HARM_CATEGORY_HARASSMENT",        "threshold": "BLOCK_MEDIUM_AND_ABOVE" }
    ]
}
EOF

API_ENDPOINT="us-central1-aiplatform.googleapis.com"
PROJECT_ID="aiapps-dev01-suzee-c63b"
MODEL_ID="gemini-pro-vision"
LOCATION_ID="us-central1"

curl \
-X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
"https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:streamGenerateContent" -d '@request.json'


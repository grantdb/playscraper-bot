import urllib.request
import urllib.parse
import json
import os

api_key = os.getenv("GEMINI_API_KEY") # wait, I don't have the user's gemini API key? I will use search_web instead. 
print("Need API key.")

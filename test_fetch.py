import urllib.request
import json
import sys

url = 'https://old.reddit.com/r/droidappshowcase/comments/1rfocg5/.json'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        post = data[0]['data']['children'][0]['data']
        print("TITLE:", post.get('title'))
        print("URL:", post.get('url'))
        print("SELFTEXT:", post.get('selftext'))
except Exception as e:
    print("Error:", e)

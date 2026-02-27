# Privacy Policy for playscraper-bot

Last updated: February 27, 2026

## 1. Information Collection
The `playscraper-bot` Devvit application is designed to enhance subreddit posts by automatically fetching information about Google Play Store applications linked in the community. 

- **Data we access:** The bot reads the content of posts and comments to identify Google Play Store URLs (`play.google.com`) and Android package IDs. 
- **Data we collect:** The bot does NOT collect, store, or transmit any personally identifiable information (PII), user data, account details, or browsing history of Reddit users. 
- **External Services:** The bot securely sends the extracted Play Store URL and Package ID to the **Google Gemini API** (`generativelanguage.googleapis.com`) to retrieve public, structured app data via Google Search Grounding. If the API fails, it may make an automated HTTP GET request to `play.google.com` as a fallback to scrape the public HTML metadata.

## 2. Storage and Security
The bot does not maintain a database or permanent storage. Post data is processed ephemerally in memory during the execution of the Devvit trigger.

## 3. Third-Party Access
We do not share, sell, or distribute any user information to third parties. App data retrieval is strictly limited to network requests between the Reddit Devvit server, the Google Gemini API, and the public Google Play Store.

## 4. Consent
By installing and using `playscraper-bot` in your subreddit, you consent to the bot reading public post content strictly for the purpose of executing its core functionality.

## 5. Contact
If you have any questions or concerns regarding this privacy policy, please contact the bot developer via Reddit.

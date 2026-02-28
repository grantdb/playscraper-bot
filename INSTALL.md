# Installation & Configuration Guide

## Prerequisites

1.  **Node.js & npm:** Make sure you have Node.js installed on your machine.
2.  **Devvit CLI:** Install the official Reddit developer CLI by running:
    ```bash
    npm install -g @devvit/cli
    ```
3.  **Google Gemini API Key:** You'll need a free API key from [Google AI Studio](https://aistudio.google.com/).
4.  **Reddit Account:** A Reddit account that is a moderator of the target subreddit where you intend to install the bot.

---

## Installation & Deployment

### 1. Clone the Repository
Clone this repository to your local machine and install the required dependencies:

```bash
git clone https://github.com/grantdb/playscraper-bot.git
cd playscraper-bot
npm install
```

### 2. Login to Devvit
Authenticate the Devvit CLI with your Reddit account:

```bash
devvit login
```

### 3. Publish the App
Upload the source code to Reddit's servers. This makes the app available to your account for installation:

```bash
npx devvit publish
```
*(Select "Continue with the source code upload, and ask me every time." when prompted).*

### 4. Install to Subreddit
Install the bot to a subreddit where you have moderation privileges (e.g., `r/TestSubreddit`):

```bash
npx devvit install r/TestSubreddit
```

---

## Configuration (API Key Setup)

For security, the Gemini API key must be configured securely on a per-subreddit basis using Reddit's built-in Mod Tools.

1.  Navigate to your subreddit on the Reddit website (e.g., `https://www.reddit.com/r/TestSubreddit`).
2.  Click on **Mod Tools** (usually found in the right sidebar or under the "About" tab on mobile).
3.  Scroll down to the **Apps** section and click on **Installed Apps**.
4.  Find **playscraper-bot** and click on it.
5.  Enter your Google Gemini API Key in the **Google Gemini API Key** configuration field.
6.  Click **Save**.

The bot is now fully operational!

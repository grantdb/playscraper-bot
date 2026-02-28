# PlayScraper Bot

A Reddit bot built on the [Devvit](https://developers.reddit.com/) platform that automatically detects Google Play Store links in new posts and leaves a stickied, cleanly formatted comment summarizing the app's details (Title, Developer, Rating, Downloads, Age Rating, and Description). 

This bot uses the [Google Gemini API](https://aistudio.google.com/) to process Play Store package IDs, extracting structured data without relying on brittle HTML scraping or encountering HTTP allowlist domain issues.

## Features

- **Automated App Summaries:** Listens for `PostSubmit` events in the subreddit. If a post contains a Play Store URL (e.g., `id=com.example.app`), the bot automatically fetches and summarizes its data.
- **Smart Delay (Wait Time):** New posts have a **1-minute built-in delay** using Devvit's `Scheduler` API. This allows Reddit's built-in spam filters and AutoModerator to act first. If a post is removed or marked as spam during this window, the bot silently ignores it.
- **Manual Post Approvals:** Includes a `ModAction` trigger that listens for `approvelink` events. If a moderator manually approves a post from the queue, the bot kicks in immediately to leave the comment.
- **Clean Markdown Output:** Generates a professional, bulleted list without emojis or excessive formatting.
- **Secure Configuration:** The Gemini API key is securely stored per-subreddit using `SettingScope.Installation`, meaning no hardcoded keys, and easy setup via the Reddit web UI.

---

## Authors & Credit

Created by **grantdb**. If you use this code as a baseline for your own projects, a quick shout-out is always appreciated!

---

## Installation & Configuration

Please see the [Installation Guide](INSTALL.md) for detailed prerequisites, deployment steps, and API key configuration.

---

## Architecture & Code Details

-   `devvit.json`: Defines the app's permissions. It explicitly allowlists the `generativelanguage.googleapis.com` domain for external fetch requests to the Gemini API.
-   `src/main.ts`: The core logic of the bot.
    -   `Devvit.configure`: Enables `redditAPI` and `http` capabilities.
    -   `Devvit.addSettings`: Defines the `gemini_api_key` installation-scoped setting.
    -   `processAppUrl(context, postId)`: Centralized helper function that queries the Reddit API for the post, extracts the Play Store ID via Regex, calls the Gemini `gemini-2.5-flash` model, and posts/stickies the formatted comment.
    -   `Devvit.addSchedulerJob`: Runs the `process_post_delayed` job. It re-fetches the post to verify its `isSpam()` and `isRemoved()` status before triggering `processAppUrl`.
    -   `PostSubmit` Trigger: Detects new posts and queues the `process_post_delayed` scheduler job for 1 minute in the future.
    -   `ModAction` Trigger: Listens for manual approvals and runs `processAppUrl` immediately.

---

## Troubleshooting

-   **Bot isn't commenting on new posts:** Ensure you wait at least 1 minute (due to the delay feature). Verify the post wasn't removed by AutoModerator.
-   **"API key is not configured" error:** Ensure you added the Gemini API key in the specific subreddit's Mod Tools -\> Apps interface, not via the CLI.
-   **Terminal loop issues:** If `devvit playtest` gets stuck or spawns infinite loops, run `npx devvit publish` and test directly on the subreddit instead of using the local playtest server.

## Privacy & Terms
Please view the [PRIVACY.md](PRIVACY.md) and [TERMS.md](TERMS.md) files in the root of the project.

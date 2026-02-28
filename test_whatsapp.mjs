import dotenv from 'dotenv';
dotenv.config();

const appId = "com.whatsapp";
const postTitle = "testing the new bot to be better than be";
const playStoreLink = `https://play.google.com/store/apps/details?id=${appId}`;
const apiKey = process.env.GEMINI_API_KEY;

const prompt = `You are a helpful assistant that retrieves details about Android apps from the Google Play Store.
Your task is to find the official information for the app with package ID: "${appId}".

HINT: The app might be related to "${postTitle}". If the package ID search fails, use this title to find the listing.

SEARCH STRATEGY:
1. Search specifically for the Google Play Store page: '${playStoreLink}'.
2. If multiple results appear, prioritize the one that matches '${appId}' exactly.

CRITICAL INSTRUCTIONS:
- You are provided with the official app URL: ${playStoreLink}. Your task is to extract its details accurately.
- TRANSLATION MANDATORY: All returned data MUST be in English.
- METRIC HARVESTING: Search result snippets often contain fragments like "Contains ads", "In-app purchases", "Everyone", or "10+ downloads". You MUST extract these.
- If you find the official page for "${appId}", return "found": true. If you are certain it does not exist, return {"found": false}.

Return a raw JSON object:
{
  "reasoning": "Briefly explain WHICH search result snippet confirmed this is the EXACT app '${appId}'.",
  "found": true or false,
  "sourceUrl": "The core Play Store URL from your search results (MUST contain 'id=${appId}')",
  "detectedPackageId": "${appId}",
  "title": "Use '${postTitle}' if the official title isn't found but the app is confirmed",
  "developer": "...",
  "rating": "...",
  "downloads": "...",
  "updated": "...",
  "ageRating": "...",
  "description": "..."
}

If you find NO evidence of any app with this package ID, return {"found": false}.`;

async function run() {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            tools: [{ googleSearch: {} }],
            generationConfig: { temperature: 0.1 }
        })
    });
    const data = await response.json();
    console.dir(data, { depth: null });
}
run();

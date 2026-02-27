// Quick test to see what Gemini actually returns for this app
// Run with: node test_gemini.mjs YOUR_API_KEY

const apiKey = process.argv[2];
if (!apiKey) { console.error("Usage: node test_gemini.mjs YOUR_API_KEY"); process.exit(1); }

const appId = 'com.furkanhalici.promptpad';

const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        contents: [{ parts: [{ text: `Return ONLY a raw JSON object (no markdown) for the Google Play app with package ID: ${appId}. Keys: found (bool), title, developer, rating, downloads, updated, ageRating, description. If not found return {"found": false}.` }] }],
        tools: [{ googleSearch: {} }],
        generationConfig: { temperature: 0.1 }
    })
});

const data = await response.json();
const parts = data.candidates?.[0]?.content?.parts ?? [];
console.log(`\n=== Number of parts: ${parts.length} ===`);
parts.forEach((p, i) => {
    console.log(`\n--- Part ${i} ---`);
    if (p.text !== undefined) console.log(`text (first 500): ${p.text.substring(0, 500)}`);
    if (p.executableCode) console.log(`executableCode: ${JSON.stringify(p.executableCode).substring(0, 200)}`);
    if (p.codeExecutionResult) console.log(`codeExecutionResult: ${JSON.stringify(p.codeExecutionResult).substring(0, 200)}`);
    if (p.functionCall) console.log(`functionCall: ${JSON.stringify(p.functionCall).substring(0, 200)}`);
    const keys = Object.keys(p).filter(k => k !== 'text');
    if (keys.length) console.log(`other keys: ${keys.join(', ')}`);
});
console.log('\n=== Full finishReason:', data.candidates?.[0]?.finishReason, '===');

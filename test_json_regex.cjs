const fs = require('fs');

try {
    const html = fs.readFileSync('test_html.html', 'utf-16le');
    const content = html.includes('<html') ? html : fs.readFileSync('test_html.html', 'utf-8');

    // 1. Finding Downloads from the JSON array structure 
    // Usually found in AF_initDataCallback with arrays like: [null,null,"10,000+"]
    const downloadsMatch = content.match(/"([\d,]+\+)"/);
    console.log("Downloads (json regex):", downloadsMatch ? downloadsMatch[1] : null);

    // 2. Finding Rating from JSON array
    // Usually like [null,null,null,[null,null,"4.5"]]
    const ratingMatch = content.match(/\[null,null,"([0-5]\.[0-9])"\]/);
    console.log("Rating:", ratingMatch ? ratingMatch[1] : null);

    // 3. Updated Date
    // Usually like "Oct 12, 2023" inside an array
    const updatedMatch = content.match(/"([A-Z][a-z]{2} \d{1,2}, \d{4})"/);
    console.log("Updated:", updatedMatch ? updatedMatch[1] : null);

    // 4. Age Rating
    const ageMatch = content.match(/"(Everyone|Teen|Mature 17\+|Everyone 10\+)"/);
    console.log("Age:", ageMatch ? ageMatch[1] : null);

} catch (e) {
    console.error(e);
}

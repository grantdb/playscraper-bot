const fs = require('fs');

try {
    // Read as UTF-16LE since the text output had weird encoding characters
    const html = fs.readFileSync('test_html.html', 'utf-16le');

    // Fallback to UTF-8 if UTF-16LE didn't decode correctly (check for <html> tag)
    const content = html.includes('<html') ? html : fs.readFileSync('test_html.html', 'utf-8');

    const titleMatch = content.match(/<title id="main-title">(.*?)<\/title>/) || content.match(/<title>(.*?)<\/title>/);
    const devMatch = content.match(/href="\/store\/apps\/dev\?id=[^"]+">([^<]+)<\/a>/) || content.match(/<div class="Vbfug auoIOc">.*?<span[^>]*>(.*?)<\/span>/);
    const ratingMatch = content.match(/aria-label="Rated ([0-9.]+) stars out of five"/);
    const downloadsMatch = content.match(/>([^<]+M\+?) Downloads</i) || content.match(/<div class="ClM7O">(.*?)<\/div>/);

    console.log("Title (regex):", titleMatch ? titleMatch[1].replace(' - Apps on Google Play', '') : null);
    console.log("Dev (regex):", devMatch ? devMatch[1] : null);
    console.log("Rating (regex):", ratingMatch ? ratingMatch[1] : null);
    console.log("Downloads (regex):", downloadsMatch ? downloadsMatch[1] : null);

} catch (e) {
    console.error("Error reading file:", e);
}

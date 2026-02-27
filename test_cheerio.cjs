const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('test_html.html', 'utf-8');
const $ = cheerio.load(html);

const title = $('h1').first().text().trim();
const dev = $('div:contains("Offered By"), a[href*="/store/apps/dev"]').first().text().trim() || $('a.VtfRFb').first().text().trim();

let rating = "Unrated";
let downloads = "Unknown";
let ageRating = "Unknown";

const wVqUob = [];
$('div.wVqUob').each((i, el) => { wVqUob.push($(el).text().trim()); });

for (const text of wVqUob) {
    if (text.includes('star')) {
        const match = text.match(/([\d.]+)star/);
        if (match) rating = match[1];
    } else if (text.includes('Downloads')) {
        downloads = text.replace('Downloads', '').trim();
    } else if (text.includes('info')) {
        ageRating = text.replace('info', '').trim();
    }
}

if (rating === "Unrated") {
    const altRating = $('div[itemprop="starRating"] > div.TT9eO').text() || $('div:contains("star")').first().text().match(/([\d.]+)star/)?.[1];
    if (altRating) rating = altRating;
}

const updatedDateText = $('div:contains("Updated on")').last().next().text() || $('div.xg1aie').text();
let updatedDate = "Unknown";
if (updatedDateText && updatedDateText.length > 5 && updatedDateText.length < 25) {
    updatedDate = updatedDateText;
}

console.log("Title:", title);
console.log("Developer:", dev);
console.log("Rating:", rating);
console.log("Downloads:", downloads);
console.log("Updated:", updatedDate);

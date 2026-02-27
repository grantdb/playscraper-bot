import * as fs from 'fs';

async function testPost() {
    const r = await fetch('https://www.reddit.com/r/droidappshowcase/comments/1rfocg5/promtvault_promo_code/.json');
    const j = await r.json();
    const d = j[0].data.children[0].data;
    const contentToSearch = `${d.url ?? ''} ${d.selftext ?? ''}`;
    console.log("Content length:", contentToSearch.length);

    const playStoreRegex = /(?:id=|testing\/)([a-zA-Z0-9._]+)/;
    let match = contentToSearch.match(playStoreRegex);

    if (match) {
        console.log("FOUND APP ID:", match[1]);
    } else {
        console.log("NO MATCH IN OP BODY");

        // Check comments
        const commentsData = j[1].data.children;
        let fallbackContent = contentToSearch;
        for (const comment of commentsData) {
            if (comment.kind === 't1' && comment.data.author === d.author) {
                fallbackContent += ` ${comment.data.body}`;
            }
        }
        const fallbackMatch = fallbackContent.match(playStoreRegex);
        if (fallbackMatch) {
            console.log("FOUND IN COMMENTS:", fallbackMatch[1]);
        } else {
            console.log("NO MATCH ANYWHERE");
        }
    }
}
testPost();

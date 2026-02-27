const url = 'https://www.reddit.com/r/droidappshowcase/comments/1rfocg5/.json';
fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    .then(res => res.json())
    .then(data => {
        const post = data[0].data.children[0].data;
        console.log("URL:", post.url);
        console.log("Selftext:", post.selftext);
        console.log("Title:", post.title);
    })
    .catch(console.error);

let news = [];
const API_KEY =``;

const getLatestNews = async () => {
        // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
        const url = new URL(`https://relaxed-liger-259fb5.netlify.app/top-headlines`);
        console.log("Requesting url", url);

        const response = await fetch(url);
        const data = await response.json();
        news = data.articles;
        console.log("News data:", news);
};

getLatestNews();

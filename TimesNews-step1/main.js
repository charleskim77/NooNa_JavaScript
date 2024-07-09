let news = [];
const API_KEY =`bad7a21cecaa4a4babf650767c4a2b98`;

const getLatestNews = async () => {
        const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
        console.log("url", url);

        const response = await fetch(url);
        const data = await response.json();
        news = data.articles;
        console.log("News data:", news);
};

getLatestNews();
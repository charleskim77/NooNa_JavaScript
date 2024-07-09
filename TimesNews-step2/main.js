let news = [];
const API_KEY =`bad7a21cecaa4a4babf650767c4a2b98`;

// const getLatestNews = async () => {
//         const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
//         console.log("Requesting url", url);

//         const response = await fetch(url);
//         const data = await response.json();
//         news = data.articles;
//         console.log("News data:", news);
// };

// getLatestNews();


const getLatestNews = async () => {
    try {
        const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
        console.log("Requesting URL:", url);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        news = data.articles;
        console.log("Received news data:", news);
        displayNews(news);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
};

const displayNews = (newsArticles) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = newsArticles.map(article => `
        <article class="news-item">
            <h2 class="news-title">${article.title}</h2>
            <p class="news-description">${article.description}</p>
            <a href="${article.url}" target="_blank" class="news-link">Read more</a>
        </article>
    `).join('');
};
getLatestNews();
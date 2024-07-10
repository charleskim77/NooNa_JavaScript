let news = [];
const API_KEY = ``;

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
        // const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
        const url = new URL(`https://relaxed-liger-259fb5.netlify.app/top-headlines`);
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

//뉴스컨텐츠
const displayNews = (newsArticles) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = newsArticles.map(article => `
        <div class="col-lg-6 col-md-6 mb-4">
            <div class="card h-100">
            ${article.urlToImage ? `<img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">` : '<img src="img/Noimage.jpg" class="card-img-top" alt="No Image Available">'}
                <div class="card-body">
                    <h5 class="card-title"><a href="${article.url}" target="_blank" class="title_link">${article.title}</a></h5>
                    <p class="card-text">${article.description || 'No description available'}</p>
                    <p class="card-date">${article.author || ' '} / ${article.publishedAt ? moment(article.publishedAt).fromNow() : ' '}</p>
                    <p class="card-category">Category : ${article.category || ' '}</p>
                </div>
                <div class="card-footer">
                    <a href="${article.url}" target="_blank" class="btn btn-secondary">Read more</a>
                </div>
            </div>
        </div>
    `).join('');
};

getLatestNews();


//검색창
document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');

    searchIcon.addEventListener('click', function () {
        searchBar.classList.toggle('active');
    });
});
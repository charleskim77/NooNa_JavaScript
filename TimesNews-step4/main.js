let newsList = [];
const menus = document.querySelectorAll(".navbar-nav .nav-item a");

const fetchNews = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};

const updateNewsList = async (url) => {
    newsList = await fetchNews(url);
    if (newsList.length === 0) {
        displayNoResults();
    } else {
        displayNews(newsList);
    }
};

// 뉴스
const getLatestNews = async () => {
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
    await updateNewsList(url);
};

// 검색
const getNewsByKeyword = async () => {
    const keyword = document.getElementById("search-input").value;
    const url = new URL(`https://relaxed-liger-259fb5.netlify.app/top-headlines?country=kr&q=${keyword}`);
    await updateNewsList(url);
};

// 카테고리
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`);
    await updateNewsList(url);
};

// 뉴스컨텐츠
const displayNews = (newsArticles) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = newsArticles.map(article => `
        <div class="col-lg-6 col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-img-container">
                    <a href="${article.url}" target="_blank" class="title_link"> <img src="${article.urlToImage || 'img/Noimage.jpg'}" class="card-img-top" alt="${article.title}" onerror="this.onerror=null; this.src='img/Noimage.jpg';"> </a>
                </div>
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

const displayNoResults = () => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <h3>일치하는 검색 내용이 없습니다.</h3>
        </div>
    `;
};

const initializeEventListeners = () => {
    menus.forEach(menu => menu.addEventListener("click", getNewsByCategory));

    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    searchIcon.addEventListener('click', () => searchBar.classList.toggle('active'));
    searchButton.addEventListener('click', getNewsByKeyword);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') getNewsByKeyword();
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    getLatestNews();
});
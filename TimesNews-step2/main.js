let newsList = [];
let currentPage = 1;
let totalResults = 0;
const PAGE_SIZE = 10;
const GROUP_SIZE = 5;
let currentState = 'latest';
let currentCategory = '';
let currentKeyword = '';

const menus = document.querySelectorAll(".navbar-nav .nav-item a");

const fetchNews = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching news:", error);
        return {
            articles: [],
            totalResults: 0
        };
    }
};

const updateNewsList = async (url) => {
    const data = await fetchNews(url);
    console.log("🚀 ~ updateNewsList ~ data:", data)
    newsList = data.articles;
    totalResults = data.totalResults;
    if (newsList.length === 0) {
        displayNoResults();
    } else {
        displayNews(newsList);
        displayPagination();
    }
};

// 뉴스
const getLatestNews = async (page = 1) => {
    currentState = 'latest';
    currentPage = page;
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&page=${page}&pageSize=${PAGE_SIZE}`);
    await updateNewsList(url);
};

// 검색
const getNewsByKeyword = async (page = 1) => {
    currentState = 'search';
    currentPage = page;
    currentKeyword = document.getElementById("search-input").value;
    const url = new URL(`https://relaxed-liger-259fb5.netlify.app/top-headlines?country=kr&q=${currentKeyword}&page=${page}&pageSize=${PAGE_SIZE}`);
    await updateNewsList(url);
};

// 카테고리
const getNewsByCategory = async (event, page = 1) => {
    currentState = 'category';
    currentPage = page;
    currentCategory = event.target.textContent.toLowerCase();
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${currentCategory}&page=${page}&pageSize=${PAGE_SIZE}`);
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


// 페이지네이션
const displayPagination = () => {
    const totalPages = Math.ceil(totalResults / PAGE_SIZE);
    const paginationElement = document.getElementById('pagination');
    const currentGroup = Math.ceil(currentPage / GROUP_SIZE);
    const lastGroup = Math.ceil(totalPages / GROUP_SIZE);

    let paginationHTML = '';

    if (currentGroup > 1) {
        paginationHTML += `
            <li class="page-item">
                <a class="page-link" href="#" data-page="1">&laquo;&laquo;</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" data-page="${(currentGroup - 1) * GROUP_SIZE}">&laquo;</a>
            </li>
        `;
    }

    for (let i = (currentGroup - 1) * GROUP_SIZE + 1; i <= Math.min(currentGroup * GROUP_SIZE, totalPages); i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    if (currentGroup < lastGroup) {
        paginationHTML += `
            <li class="page-item">
                <a class="page-link" href="#" data-page="${currentGroup * GROUP_SIZE + 1}">&raquo;</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" data-page="${totalPages}">&raquo;&raquo;</a>
            </li>
        `;
    }

    paginationElement.innerHTML = paginationHTML;

    paginationElement.querySelectorAll('.page-link').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const newPage = parseInt(e.target.dataset.page);
            handlePageChange(newPage);
        });
    });
};

const handlePageChange = (newPage) => {
    switch (currentState) {
        case 'latest':
            getLatestNews(newPage);
            break;
        case 'category':
            getNewsByCategory({
                target: {
                    textContent: currentCategory
                }
            }, newPage);
            break;
        case 'search':
            getNewsByKeyword(newPage);
            break;
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

const initializeEventListeners = () => {
    menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));

    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    searchIcon.addEventListener('click', () => searchBar.classList.toggle('active'));
    searchButton.addEventListener('click', () => getNewsByKeyword());
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') getNewsByKeyword();
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    getLatestNews();
});
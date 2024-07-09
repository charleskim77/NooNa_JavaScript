let news = [];

const getApiKey = () => 
    fetch('get_api_key.php')
        .then(response => response.json())
        .then(data => data.api_key);

const getLatestNews = async () => {
    try {
        const apiKey = await getApiKey();
        console.log("apikey", apiKey);

        const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        console.log("url", url);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        news = data.articles;
        console.log("News data:", news);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
};

getLatestNews();
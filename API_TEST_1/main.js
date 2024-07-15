document.addEventListener('DOMContentLoaded', function() {
    fetchNews();
});

function fetchNews() {
    var xhr = new XMLHttpRequest();
    var url = 'http://api.kcisa.kr/openapi/API_TOU_052/request';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'a55da248-cd56-4b52-a9e5-d25ae963c932';
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');

    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/xml");
            var items = xmlDoc.getElementsByTagName('item');
            displayNews(items);
        }
    };
    xhr.send('');
}

function displayNews(items) {
    var newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var newsItem = document.createElement('div');
        newsItem.className = 'col-md-6 mb-4';
        newsItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${getElementTextContent(item, 'title')}</h5>
                    <p class="card-text"><strong>Date:</strong> ${getElementTextContent(item, 'issuedDate')}</p>
                    <p class="card-text"><strong>Category:</strong> ${getElementTextContent(item, 'category1')} > ${getElementTextContent(item, 'category2')} > ${getElementTextContent(item, 'category3')}</p>
                    <p class="card-text"><strong>Information:</strong> ${getElementTextContent(item, 'information')}</p>
                    <p class="card-text"><strong>Tel:</strong> ${getElementTextContent(item, 'tel')}</p>
                    <p class="card-text"><strong>Operating Time:</strong> ${getElementTextContent(item, 'operatingTime')}</p>
                    <p class="card-text"><strong>Address:</strong> ${getElementTextContent(item, 'address')}</p>
                    <p class="card-text"><strong>Coordinates:</strong> ${getElementTextContent(item, 'coordinates')}</p>
                </div>
            </div>
        `;
        newsContainer.appendChild(newsItem);
    }
}

function getElementTextContent(parent, tagName) {
    var element = parent.getElementsByTagName(tagName)[0];
    return element ? element.textContent : '';
}
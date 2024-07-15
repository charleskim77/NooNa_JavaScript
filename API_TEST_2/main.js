function fetchAndDisplayData() {
    fetch('https://stargolf.info/API_TEST/get_tasks.php')
        .then(response => response.json())
        .then(data => {
            const apiContainer = document.getElementById('ApiContainer');
            apiContainer.innerHTML = ''; // Clear existing content

            data.data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'col-md-6 col-lg-4 mb-4';
                card.innerHTML = `
                    <div class="card h-100">
                        <img src="${item.wr_link1}" class="card-img-top" alt="${item.wr_subject}">
                        <div class="card-body">
                            <h5 class="card-title">${item.wr_subject}</h5>
                            <p class="card-text"><strong>Type:</strong> ${item.wr_1}</p>
                            <p class="card-text"><strong>Category:</strong> ${item.wr_2}</p>
                            <p class="card-text"><strong>Address:</strong> ${item.wr_6}</p>
                            <p class="card-text">${item.wr_content.substring(0, 150)}...</p>
                        </div>
                    </div>
                `;
                apiContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', fetchAndDisplayData);
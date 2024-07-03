// script.js
document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            populateTable(data);
            renderChart(data);
        })
        .catch(error => console.error('Error fetching the data:', error));
});

function populateTable(data) {
    const tableBody = document.querySelector("#cryptoTable tbody");
    data.forEach(coin => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price.toLocaleString()}</td>
            <td>$${coin.market_cap.toLocaleString()}</td>
        `;
        tableBody.appendChild(row);
    });
}

function renderChart(data) {
    const ctx = document.getElementById('cryptoChart').getContext('2d');
    const labels = data.map(coin => coin.name);
    const prices = data.map(coin => coin.current_price);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price (USD)',
                data: prices,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

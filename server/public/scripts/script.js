console.log("Script loaded");

let destinations = [];

async function fetchDestinations() {
    try {
        const response = await fetch('/destinations');
        const data = await response.json();
        destinations = data;
        displayDestinations();
    } catch (error) {
        console.error('Error fetching destinations:', error);
    }
}

function displayDestinations() {
    console.log("Displaying destinations");
    const container = document.getElementById('destinations-container');
    container.innerHTML = '';

    destinations.forEach(destination => {
        const card = document.createElement('article');
        card.className = 'destination-card';
        card.innerHTML = `
            <header>
                <h2><a href="#${destination.id}">${destination.name}</a></h2>
            </header>
            <img src="${destination.imageUrl}" alt="${destination.name}">
            <p><strong>Main Attractions:</strong> ${destination.attractions.join(', ')}</p>
            <p><strong>Best Time to Visit:</strong> ${destination.bestTimeToVisit}</p>
            <p><strong>Travel Tips:</strong> ${destination.travelTips}</p>
            <p><strong>Average Cost:</strong> ${destination.averageCost}</p>
        `;
        container.appendChild(card);
    });
}

function displayDetailedView(destinationId) {
    const destination = destinations.find(d => d.id === parseInt(destinationId));
    if (!destination) {
        displayNotFound();
        return;
    }

    const detailedView = document.getElementById('detailed-view');
    detailedView.style.display = 'block';
    detailedView.innerHTML = `
        <article>
            <header>
                <h2>${destination.name}</h2>
            </header>
            <img src="${destination.imageUrl}" alt="${destination.name}">
            <p><strong>Main Attractions:</strong> ${destination.attractions.join(', ')}</p>
            <p><strong>Best Time to Visit:</strong> ${destination.bestTimeToVisit}</p>
            <p><strong>Travel Tips:</strong> ${destination.travelTips}</p>
            <p><strong>Average Cost:</strong> ${destination.averageCost}</p>
            <footer>
                <button onclick="goBack()">Back</button>
            </footer>
        </article>
    `;
    document.getElementById('main-content').style.display = 'none';
}

function displayNotFound() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('detailed-view').style.display = 'none';
    document.getElementById('not-found').style.display = 'block';
}

function goBack() {
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('detailed-view').style.display = 'none';
    document.getElementById('not-found').style.display = 'none';
}

window.addEventListener('hashchange', () => {
    const destinationId = window.location.hash.substring(1);
    if (destinationId) {
        displayDetailedView(destinationId);
    } else {
        goBack();
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM fully loaded and parsed");
    await fetchDestinations();
    if (window.location.hash) {
        const destinationId = window.location.hash.substring(1);
        displayDetailedView(destinationId);
    }
});

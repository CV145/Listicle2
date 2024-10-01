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
                <h2>${destination.name}</h2>
            </header>
            <img src="${destination.imageurl}" alt="${destination.name}">
        `;
        card.addEventListener('click', () => displayDetailedView(destination));
        container.appendChild(card);
    });
}

function displayDetailedView(destination) {
    console.log('Destination Data:', destination); // Add this log
    const detailedView = document.getElementById('detailed-view');
    detailedView.style.display = 'block';
    detailedView.innerHTML = `
    <article>
        <header>
            <h2>${destination.name}</h2>
        </header>
        <img src="${destination.imageurl}" alt="${destination.name}">
        <p><strong>Main Attractions:</strong> ${Array.isArray(destination.attractions) ? destination.attractions.join(', ') : destination.attractions}</p>
        <p><strong>Best Time to Visit:</strong> ${destination.besttimetovisit}</p>
        <p><strong>Travel Tips:</strong> ${destination.traveltips}</p>
        <p><strong>Average Cost:</strong> ${destination.averagecost}</p>
        <footer>
            <button onclick="goBack()">Back</button>
        </footer>
    </article>
`;
    document.getElementById('main-content').style.display = 'none';
}


function goBack() {
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('detailed-view').style.display = 'none';
    document.getElementById('not-found').style.display = 'none';
}

window.addEventListener('hashchange', () => {
    const destinationId = window.location.hash.substring(1);
    if (destinationId) {
        const destination = destinations.find(d => d.id === parseInt(destinationId));
        if (destination) {
            displayDetailedView(destination);
        } else {
            displayNotFound();
        }
    } else {
        goBack();
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM fully loaded and parsed");
    await fetchDestinations();
    if (window.location.hash) {
        const destinationId = window.location.hash.substring(1);
        const destination = destinations.find(d => d.id === parseInt(destinationId));
        if (destination) {
            displayDetailedView(destination);
        } else {
            displayNotFound();
        }
    }
});

//Searching
document.getElementById('search-button').addEventListener('click', function () {
    const query = document.getElementById('search-input').value.toLowerCase();
    filterDestinations(query);
});

document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const query = e.target.value.toLowerCase();
        filterDestinations(query);
    }
});

function filterDestinations(query) {
    const filteredDestinations = destinations.filter(destination => {
        return destination.name.toLowerCase().includes(query) ||
            destination.attractions.some(attraction => attraction.toLowerCase().includes(query)) ||
            destination.besttimetovisit.toLowerCase().includes(query) ||
            destination.traveltips.toLowerCase().includes(query) ||
            destination.averagecost.toLowerCase().includes(query);
    });
    displayFilteredDestinations(filteredDestinations);
}

function displayFilteredDestinations(filteredDestinations) {
    const container = document.getElementById('destinations-container');
    container.innerHTML = '';

    if (filteredDestinations.length === 0) {
        container.innerHTML = '<p>No results found</p>';
        return;
    }

    filteredDestinations.forEach(destination => {
        const card = document.createElement('article');
        card.className = 'destination-card';
        card.innerHTML = `
            <header>
                <h2>${destination.name}</h2>
            </header>
            <img src="${destination.imageurl}" alt="${destination.name}">
        `;
        card.addEventListener('click', () => displayDetailedView(destination));
        container.appendChild(card);
    });
}

function displayDetailedView(destination) {
    const detailedView = document.getElementById('detailed-view');
    detailedView.style.display = 'block';
    detailedView.innerHTML = `
    <article>
        <header>
            <h2>${destination.name}</h2>
        </header>
        <img src="${destination.imageurl}" alt="${destination.name}">
        <p><strong>Main Attractions:</strong> ${destination.attractions.join(', ')}</p>
        <p><strong>Best Time to Visit:</strong> ${destination.besttimetovisit}</p>
        <p><strong>Travel Tips:</strong> ${destination.traveltips}</p>
        <p><strong>Average Cost:</strong> ${destination.averagecost}</p>
        <footer>
            <button onclick="goBack()">Back</button>
        </footer>
    </article>
    `;
    document.getElementById('main-content').style.display = 'none';
}

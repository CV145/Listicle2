console.log("Script loaded");

const destinations = [
    {
        id: 1,
        name: "Big Bend National Park",
        imageUrl: "https://example.com/images/bigbend.jpg",
        attractions: ["Lost Mine Trail", "Santa Elena Canyon", "South Rim Trail"],
        bestTimeToVisit: "October to April",
        travelTips: "Carry plenty of water and be prepared for changing weather.",
        averageCost: "$"
    },
    {
        id: 2,
        name: "Guadalupe Mountains National Park",
        imageUrl: "https://example.com/images/guadalupe.jpg",
        attractions: ["Guadalupe Peak", "Devil's Hall Trail", "McKittrick Canyon"],
        bestTimeToVisit: "September to May",
        travelTips: "Start hikes early in the day to avoid afternoon thunderstorms.",
        averageCost: "$"
    },
    {
        id: 3,
        name: "Enchanted Rock State Natural Area",
        imageUrl: "https://example.com/images/enchantedrock.jpg",
        attractions: ["Summit Trail", "Loop Trail", "Echo Canyon Trail"],
        bestTimeToVisit: "October to April",
        travelTips: "Weekdays are less crowded; bring a flashlight for cave exploration.",
        averageCost: "$"
    },
    {
        id: 4,
        name: "Palo Duro Canyon State Park",
        imageUrl: "https://example.com/images/paloduro.jpg",
        attractions: ["Lighthouse Trail", "Givens, Spicer & Lowry Trail", "Capitol Peak"],
        bestTimeToVisit: "March to May",
        travelTips: "Wear sturdy shoes and bring sunscreen; the trails can be rocky and exposed.",
        averageCost: "$"
    },
    {
        id: 5,
        name: "Pedernales Falls State Park",
        imageUrl: "https://example.com/images/pedernalesfalls.jpg",
        attractions: ["Wolf Mountain Trail", "Twin Falls Nature Trail", "Pedernales Falls"],
        bestTimeToVisit: "October to April",
        travelTips: "Check river conditions before visiting; trails can be slippery when wet.",
        averageCost: "$"
    }
];

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

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    displayDestinations();
    if (window.location.hash) {
        const destinationId = window.location.hash.substring(1);
        displayDetailedView(destinationId);
    }
});

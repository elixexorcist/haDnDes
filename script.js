document.getElementById('dungeonForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const groupSize = parseInt(document.getElementById('groupSize').value);
    const level = parseInt(document.getElementById('level').value);
    const difficulty = parseInt(document.getElementById('difficulty').value);
    let seedInput = document.getElementById('seed').value;

    // If no seed is provided, generate a random seed
    const seed = seedInput || Math.floor(Math.random() * 10000).toString();

    // Initialize the seedable random function
    let random = new Math.seedrandom(seed);

    // Load power-ups from JSON
    fetch('powerups.json')
        .then(response => response.json())
        .then(data => {
            const powerups = data.powerups;
            const selectedPowerups = [];

            // Randomly select groupSize + 1 power-ups
            for (let i = 0; i < groupSize + 1; i++) {
                const randomIndex = Math.floor(random() * powerups.length);
                selectedPowerups.push(powerups[randomIndex]);
            }

            // Display the power-ups and room options
            displayPowerups(selectedPowerups);
            showRoomOptions(random);
        })
        .catch(error => {
            console.error('Error loading power-ups:', error);
        });
});

function displayPowerups(powerups) {
    const powerupDisplay = document.getElementById('powerupDisplay');
    powerupDisplay.innerHTML = '<h2>Selected Power-ups</h2><ul>' +
        powerups.map(p => `<li>${p}</li>`).join('') + '</ul>';
    powerupDisplay.classList.remove('hidden');
}

function showRoomOptions(random) {
    const roomSelection = document.getElementById('roomSelection');
    roomSelection.classList.remove('hidden');

    const rooms = ['Normal Fight', 'Boss Fight', 'Resting Room', 'Healing Room', 'Riddle Room', 'Shopping Room', 'Random Room'];
    const selectedRooms = [];

    // Randomly select four room options
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(random() * rooms.length);
        selectedRooms.push(rooms[randomIndex]);
    }

    // Display room options
    roomSelection.innerHTML = '<h2>Select a Room</h2><ul>' +
        selectedRooms.map((room, index) => `<li><button onclick="roomLogic('${room}')">${room}</button></li>`).join('') + '</ul>';
}

function roomLogic(room) {
    switch (room) {
        case 'Normal Fight':
            alert('You encountered a group of enemies!');
            break;
        case 'Boss Fight':
            alert('A boss has appeared!');
            break;
        case 'Resting Room':
            alert('You found a safe room to rest.');
            break;
        case 'Healing Room':
            alert('You recovered health in the healing room.');
            break;
        case 'Riddle Room':
            alert('Solve a riddle to proceed.');
            break;
        case 'Shopping Room':
            alert('A merchant offers you items for sale.');
            break;
        case 'Random Room':
            alert('Something unexpected happens!');
            break;
        default:
            alert('Unknown room.');
    }
}

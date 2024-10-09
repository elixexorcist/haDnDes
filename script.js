// Update difficulty label based on slider input
function updateDifficultyLabel(value) {
    const difficultyLabel = document.getElementById('difficultyLabel');
    const labels = ['Easy', 'Medium', 'Hard', 'Deadly'];
    difficultyLabel.textContent = labels[value - 1] || 'Easy';
}

// Auto populate the Seed field with a random seed
document.addEventListener('DOMContentLoaded', function() {
    const seedInput = document.getElementById('seed');
    if (seedInput && !seedInput.value) {
        seedInput.value = Math.floor(Math.random() * 10000).toString();
    }
});

// Event listener for form submission
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
            const baseSigils = data.BaseSigils;
            const powerups = Object.values(baseSigils);
            const selectedPowerups = [];

            // Randomly select groupSize + 1 power-ups from BaseSigils
            for (let i = 0; i < groupSize + 1; i++) {
                const randomIndex = Math.floor(random() * powerups.length);
                selectedPowerups.push(powerups[randomIndex]);
            }

            // Update the central field with power-ups and room options
            updateCentralDisplay(selectedPowerups, random);
        })
        .catch(error => {
            console.error('Error loading power-ups:', error);
        });
});

// Update the central display with power-ups and room options
function updateCentralDisplay(powerups, random) {
    const centralDisplay = document.getElementById('centralDisplay');
    centralDisplay.innerHTML = '<h2>Selected Power-ups</h2><ul>' +
        powerups.map(p => `<li>${p.Name}<br><em>${p.Description}</em><br><pre class="command-block">${p.Command}</pre><button class="copy-btn" onclick="copyToClipboard('${p.Command.replace(/"/g, '\"')}')">Copy to Clipboard</button></li>`).join('') + '</ul>';

    const rooms = ['Normal Fight', 'Boss Fight', 'Resting Room', 'Healing Room', 'Riddle Room', 'Shopping Room', 'Random Room'];
    const selectedRooms = [];

    // Randomly select four room options
    while (selectedRooms.length < 4) {
        const randomIndex = Math.floor(random() * rooms.length);
        const room = rooms[randomIndex];
        if (!selectedRooms.includes(room)) {
            selectedRooms.push(room);
        }
    }

    centralDisplay.innerHTML += '<h2>Select a Room</h2><ul>' +
        selectedRooms.map((room, index) => `<li><button onclick="roomLogic('${room}', '${random}')">${room}</button></li>`).join('') + '</ul>';
    centralDisplay.classList.remove('hidden');
}

// Copy to Clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Command copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard. Please try again.');
    });
}

// Room logic for selected room
function roomLogic(room, seed) {
    // Using seed here can ensure consistency if needed
    alert(`You chose: ${room}`);
    // Logic for handling each room type can be expanded here
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
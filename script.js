// 1. GAME DATA LAYER
let funds = 10000;
let temp = 40;
let stability = 100;
let days = 0;
let gameActive = true;

// 2. ELEMENT SELECTORS
const fundsEl = document.getElementById('funds');
const tempEl = document.getElementById('temp');
const stabilityEl = document.getElementById('stability');
const daysEl = document.getElementById('days');
const logStream = document.getElementById('log-stream');

const servers = [
    document.getElementById('node-1'), document.getElementById('node-2'),
    document.getElementById('node-3'), document.getElementById('node-4'),
    document.getElementById('node-5'), document.getElementById('node-6'),
    document.getElementById('node-7'), document.getElementById('node-8')
];

// 3. RENDERING FUNCTIONS
function addLogEntry(message, messageType = 'sys-msg') {
    const p = document.createElement('p');
    p.className = `log-entry ${messageType}`;
    p.textContent = `[DAY ${days}]: ${message}`;
    logStream.appendChild(p);
    logStream.scrollTop = logStream.scrollHeight;
}

function renderDashboard() {
    fundsEl.textContent = `$${funds}`;
    tempEl.textContent = temp;
    stabilityEl.textContent = stability;
    daysEl.textContent = days;

    servers.forEach((server) => {
        if (!server) return;
        server.className = 'server-node'; 
        
        if (temp >= 80) {
            server.classList.add('node-critical');
        } else if (temp >= 60) {
            server.classList.add('node-warning');
        } else {
            server.classList.add('node-active');
        }
    });

    if (funds <= 0) {
        endSimulation("BANKRUPTCY: Your operational funds completely drained out!");
    } else if (temp >= 100) {
        endSimulation("HARDWARE MELTDOWN: Core temperature breached 100°C limit!");
    } else if (stability <= 0) {
        endSimulation("NETWORK ISOLATION: Telemetry link permanently dropped to 0%!");
    }
}

function endSimulation(reason) {
    gameActive = false;
    clearInterval(simulationEngine);
    addLogEntry(`CRITICAL FAULT - ${reason}`, 'alert-msg');
    alert(`SIMULATION OVER!\n${reason}\nYour infrastructure survived for ${days} days.`);
}

// 4. COMMAND INTERACTIONS
document.getElementById('btn-vent').addEventListener('click', () => {
    if (!gameActive) return;
    if (funds >= 200) {
        funds -= 200;
        temp = Math.max(15, temp - 20);
        addLogEntry("Vents opened. Ambient Arctic blast cooled physical matrices.", 'success-msg');
        renderDashboard();
    } else {
        addLogEntry("Inadequate budget reserves to actuate climate ventilation arrays.", 'alert-msg');
    }
});

document.getElementById('btn-satellite').addEventListener('click', () => {
    if (!gameActive) return;
    if (funds >= 500) {
        funds -= 500;
        stability = Math.min(100, stability + 25);
        addLogEntry("Reoriented dishes to secondary satellite array. Signal boosted.", 'success-msg');
        renderDashboard();
    } else {
        addLogEntry("Insufficient capital assets to realign high-frequency antennas.", 'alert-msg');
    }
});

document.getElementById('btn-solicit').addEventListener('click', () => {
    if (!gameActive) return;
    funds += 1000;
    temp += 3;
    addLogEntry("Environmental compliance framework approved. Grants received: +\$1,000", 'success-msg');
    renderDashboard();
});

document.getElementById('btn-restart').addEventListener('click', () => {
    location.reload(); 
});

// 5. TIMED SYSTEM ENGINE
const simulationEngine = setInterval(() => {
    if (!gameActive) return;

    days++;
    funds -= 150; 
    temp += 5;    

    const incidentChance = Math.floor(Math.random() * 3);

    if (incidentChance === 0) {
        stability -= 15;
        addLogEntry("Severe blizzard hitting Svalbard region. Signal interference scaling up.", 'alert-msg');
    } else if (incidentChance === 1) {
        temp += 10;
        addLogEntry("Polar frost blocking intake duct valves. Cooling capacity degrading.", 'alert-msg');
    } else {
        addLogEntry("Atmospheric conditions steady. Thermal dissipation normal.", 'sys-msg');
    }

    renderDashboard();
}, 3000);

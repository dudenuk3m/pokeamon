// 1. The Color Dictionary (The Librarian's Color Guide)
const typeColors = {
    fire: '#ff421c',
    water: '#2e9aff',
    grass: '#48d0b0',
    electric: '#f9d130',
    psychic: '#ff65a5',
    ice: '#76d1ff',
    dragon: '#7038f8',
    dark: '#705848',
    fairy: '#ee99ac',
    normal: '#a8a878',
    fighting: '#c03028',
    flying: '#a890f0',
    poison: '#a040a0',
    ground: '#e0c068',
    rock: '#b8a038',
    bug: '#a8b820',
    ghost: '#705898',
    steel: '#b8b8d0'
};

// 2. The Main Button Clicker
document.getElementById('generateBtn').addEventListener('click', async () => {
    const cardArea = document.getElementById('cardArea');
    
    // Pick the random ID first!
    const randomId = Math.floor(Math.random() * 1010) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

    cardArea.innerHTML = "<p>Choosing your Pokémon...</p>";

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Get all the cool stats
        const name = data.name.toUpperCase();
        const image = data.sprites.other['official-artwork'].front_default;
        const type = data.types[0].type.name;
        const hp = data.stats[0].base_stat;
        const cryUrl = data.cries.latest; 
        const themeColor = typeColors[type] || '#f1c40f';

        // Build the card in the HTML
        cardArea.innerHTML = `
            <div class="poke-card" style="border-color: ${themeColor}">
                <p style="color: ${themeColor}"><strong>HP ${hp}</strong></p>
                <img src="${image}" alt="${name}">
                <h2 style="color: #333">${name}</h2>
                <span class="type-tag" style="background-color: ${themeColor}">${type}</span>
                <br><br>
                <button class="audio-btn" onclick="playCry('${cryUrl}')">🔊 Hear Cry</button>
            </div>
        `;

    } catch (error) {
        console.error(error);
        cardArea.innerHTML = "<p>The Pokémon escaped! Try again.</p>";
    }
});

// 3. The Sound Player (Outside at the bottom)
window.playCry = (url) => {
    const audio = new Audio(url);
    audio.play();
};
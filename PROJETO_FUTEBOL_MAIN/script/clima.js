const chave_api = 'dd82cd7d65f84df39c8131942242811'; 
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chave_api}&q=São Paulo&lang=pt`;

async function mostrartempo() {
    const tempoCard = document.getElementById('card-tempo');

    try {
        const api = await fetch(apiUrl);
        if (!api.ok) {
            alert('Erro ao buscar dados da API.');
        }
       
        const data = await api.json();

        const { location, current } = data;
        tempoCard.innerHTML = `
            <h3>${location.region}</h3>
            <img src="https:${current.condition.icon}" alt="Ícone do clima">
            <p><strong>Condição:</strong> ${current.condition.text}</p>
            <p><strong>Temperatura:</strong> ${current.temp_c}°C</p>
            <p><strong>Sensação térmica:</strong> ${current.feelslike_c}°C</p>
            <p><strong>Umidade:</strong> ${current.humidity}%</p>
        `;
    } catch (error) {
        tempoCard.innerHTML = 'Não foi possível carregar a previsão do tempo.';
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', mostrartempo);

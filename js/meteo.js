'use strict';
import { getGeolocalisation } from './geolocalisation.js';

async function fetchMeteo() {
    try {
        const datas = await getGeolocalisation();
        const response = await fetch(`https://www.infoclimat.fr/public-api/gfs/json?_ll=${datas.loc}&_auth=ARsDFFIsBCZRfFtsD3lSe1Q8ADUPeVRzBHgFZgtuAH1UMQNgUTNcPlU5VClSfVZkUn8AYVxmVW0Eb1I2WylSLgFgA25SNwRuUT1bPw83UnlUeAB9DzFUcwR4BWMLYwBhVCkDb1EzXCBVOFQoUmNWZlJnAH9cfFVsBGRSPVs1UjEBZwNkUjIEYVE6WyYPIFJjVGUAZg9mVD4EbwVhCzMAMFQzA2JRMlw5VThUKFJiVmtSZQBpXGtVbwRlUjVbKVIuARsDFFIsBCZRfFtsD3lSe1QyAD4PZA%3D%3D&_c=19f3aa7d766b6ba91191c8be71dd1ab2`);
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des données météo :', error);
        return null;
    }
}

function formatTemperature(temp) {
    return (temp - 273.15).toFixed(2);
}

function meteoTemplate(meteo) {
    const conteneurMeteo = document.getElementById('ConteneurMeteo');
    const meteoData = Object.values(meteo).slice(5, 10);
    const timesOfDay = ['Matin', 'Midi', 'Après-midi','Soir', 'Nuit'];
    

    conteneurMeteo.innerHTML = meteoData.map((meteo, key) => `
        <div class="echeance">
            <h3>${timesOfDay[key]}</h3>
            <p>Température : ${formatTemperature(meteo.temperature['2m'])}°C</p>
            <p>Vent moyen : ${meteo.vent_moyen['10m']} m/s</p>
            <p>Humidité : ${meteo.humidite['2m']}%</p>
        </div>
    `).join('');
}

export { fetchMeteo, meteoTemplate };


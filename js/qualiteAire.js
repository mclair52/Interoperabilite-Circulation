'use strict';

async function fetchAirQuality() {
    try {
        const response = await fetch(`https://services3.arcgis.com/Is0UwT37raQYl9Jj/arcgis/rest/services/ind_grandest/FeatureServer/0/query?where=lib_zone%3D%27Nancy%27&outFields=*&f=pjson`);
        const data = await response.json();

        const now = Date.now();
        let closestFeature = null;
        let closestTimeDifference = Infinity;

        data.features.forEach(feature => {
            const attributes = feature.attributes;
            const startTime = new Date(attributes.date_ech).getTime();
            const timeDifference = Math.abs(startTime - now);

            if (timeDifference < closestTimeDifference) {
                closestFeature = feature;
                closestTimeDifference = timeDifference;
            }
        });

        if (closestFeature) {
            document.getElementById('qualite').innerHTML = `
                <h2><strong>Qualité de l'air à ${closestFeature.attributes.lib_zone} :</strong>
                ${closestFeature.attributes.lib_qual}</h2>`;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de la qualité de l’air :', error);
    }
}

export { fetchAirQuality };

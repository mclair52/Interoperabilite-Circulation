'use strict';

import { fetchMeteo, meteoTemplate } from "./meteo.js";
import { fetchAirQuality } from "./qualiteAire.js";
import { createMap, iutCoord, veloTemplate } from "./map.js";
import { fetchAllSarsCov2Data } from "./covid.js";
import { createChart } from "./chart.js";

window.addEventListener('load', async () => {
    try {
        const map = await createMap();
        const data = await fetchAllSarsCov2Data();
        createChart(data);

        const meteo = await fetchMeteo();
        
        await iutCoord(map);
        await veloTemplate(map);
        await meteoTemplate(meteo);
        await fetchAirQuality();
    } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
    }
});

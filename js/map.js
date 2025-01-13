import { getGeolocalisation } from "./geolocalisation.js";

async function createMap() {
    const datas = await getGeolocalisation();
    console.log(datas);

    const lat = await datas.loc.split(",")[0];
    const lon = await datas.loc.split(",")[1];
    console.log("localisation:"+datas.loc ,lat,lon);
    const map = await L.map('map').setView([lat,lon], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map;
}

async function iutCoord(map) {
    try {
        const response = await fetch("https://api-adresse.data.gouv.fr/search/?q=2%20boulevard%20charlemagne");
        const data = await response.json();

        const iutFeature = data.features.find(feature => feature.properties.label === "2 Boulevard Charlemagne 54000 Nancy");

        if (iutFeature) {
            const [lon,lat] = iutFeature.geometry.coordinates;
            L.marker([lat, lon]).addTo(map).bindPopup("Vous êtes ici").openPopup();
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des coordonnées IUT :", error);
    }
}

async function veloTemplate(map) {
    try {
        const stationInfoResponse = await fetch("https://api.cyclocity.fr/contracts/nancy/gbfs/station_information.json");
        const stationInfoData = await stationInfoResponse.json();

        const stationStatusResponse = await fetch("https://api.cyclocity.fr/contracts/nancy/gbfs/station_status.json");
        const stationStatusData = await stationStatusResponse.json();

        const statusMap = new Map();
        stationStatusData.data.stations.forEach(station => {
            statusMap.set(station.station_id, station);
        });

        stationInfoData.data.stations.forEach(station => {
            const status = statusMap.get(station.station_id);

            if (status) {
                const marker = L.marker([station.lat, station.lon]).addTo(map);
                marker.bindPopup(`
                    <b>${station.address}</b>
                    <br>${station.name}
                    <br>Capacité restante : ${station.capacity}
                    <br>Nombre de vélos disponibles : ${status.num_bikes_available}
                    <br>Emplacements disponibles : ${status.num_docks_available}`);
            }
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des données vélos :", error);
    }
}

export { createMap, iutCoord, veloTemplate };

'use strict';

async function fetchAllSarsCov2Data() {
    let result = []; 
    let i = 1;
    const pageSize = 50;

    while (true) {
        const url = `https://tabular-api.data.gouv.fr/api/resources/2963ccb5-344d-4978-bdd3-08aaf9efe514/data/?page=${i}&page_size=${pageSize}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (!data.data || data.data.length === 0) {
                break; 
            }
            result = result.concat(
                data.data.map(item => ({
                    semaine: item.semaine,
                    MAXEVILLE: item.MAXEVILLE,
                }))
            );
            i++; 
        } catch (error) {
            console.error(`Erreur lors de la récupération des données (page ${i}):`, error);
            break; 
        }
    }
    return result; 
}

export { fetchAllSarsCov2Data };

function createChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const filteredData = data.filter(item => item.MAXEVILLE !== null);
    const labels = filteredData.map(item => item.semaine);
    const values = filteredData.map(item => item.MAXEVILLE);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'MAXEVILLE',
                data: values,
                borderColor: 'green',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

export {
    createChart
}
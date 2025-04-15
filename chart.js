const ctx = document.getElementById('lineChart').getContext('2d');
let chart; // globális változó a Chart példányhoz

// Minden sorra eseményfigyelő
document.querySelectorAll('#data-table tbody tr').forEach((row, index) => {
  row.addEventListener('click', () => {
    const values = Array.from(row.cells)
      .slice(1) // csak a szám értékek kellenek
      .map(cell => Number(cell.textContent));

    const labels = values.map((_, i) => `Érték ${i + 1}`);

    if (chart) chart.destroy(); // előző chart törlése, ha van

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: `Sor ${index + 1} értékei`,
          data: values,
          borderColor: 'green',
          borderWidth: 2,
          fill: false,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
});
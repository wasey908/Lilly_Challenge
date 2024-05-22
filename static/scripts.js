const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')

function drawLine (start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}


const symbol = 'AAPL'

fetch(`/stocks/${symbol}`)
  .then(response => response.json())
  .then(data => {
    if (data && data.data) {
      const chartData = {
        labels: data.data.map(item => item.date),
        datasets: [{
          label: symbol,
          data: data.data.map(item => item.price),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }],
      };
      const chartConfig = {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    
      const chartCanvas = document.getElementById('chart');
      new Chart(chartCanvas, chartConfig);
    } else {
      console.error("Error retrieving stock data: Invalid response format");
    }
  })
  .catch(err => {
    console.error("Error retrieving stock data:", err);
  });


fetch('/stocks')
  .then(response => response.json())
  .then(data => {
    data.stockSymbols.forEach(symbol => {
      fetch(`/stocks/${symbol}`)
        .then(response => response.json())
        .then(stockData => {
          console.log(`Stock data for ${symbol}:`, stockData);
          // Process the stock data and update the chart
        })
        .catch(error => console.error(`Error getting data for ${symbol}:`, error));
    });
  })
  .catch(error => console.error('Error getting stock symbols:', error));

  let spinner = document.querySelector('.spinner');
  let stockDataCount = 0;
  let totalStocks = 0;
  
  fetch('/stocks')
    .then(response => response.json())
    .then(data => {
      totalStocks = data.stockSymbols.length;
      data.stockSymbols.forEach(symbol => {
        fetch(`/stocks/${symbol}`)
          .then(response => response.json())
          .then(stockData => {
            stockDataCount++;
            if (stockDataCount === totalStocks) {
              spinner.style.display = 'none';
            }
            // Process the stock data and update the chart
          })
          .catch(error => console.error(`Error getting data for ${symbol}:`, error));
      });
    })
    .catch(error => console.error('Error getting stock symbols:', error));

drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])

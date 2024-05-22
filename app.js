const express = require('express')
const path = require('path')
const stocks = require('./stocks')

const app = express()
app.use(express.static(path.join(__dirname, 'static')))

app.get('/stocks', async (req, res) => {
  const stockSymbols = await stocks.getStocks()
  res.send({ stockSymbols })
})

app.get('/stocks/:symbol', async (req, res) => {
  const { params: { symbol } } = req;
  try {
    const data = await stocks.getStockPoints(symbol, new Date())
    console.log("Stock data: ", data);
    res.send({data});
  } catch (err) {
    console.error("Error retrieving stock data: ", err);
    res.status(500).send({ error: "Failed to generate stock data" });
  }

});

function getStockData(symbol) {
  
}

app.get('/stocks/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  const randomFailure = Math.random() < 0.1;

  if (randomFailure) {
    res.status(500).json({ error: 'Failed to retrieve stock data' });
  } else {
    const stockData = getStockData(symbol);
    res.json(stockData);
  }
});

app.listen(3000, () => console.log('Server is running!'))

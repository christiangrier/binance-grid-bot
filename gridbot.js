
const tradeurl = "wss://stream.binance.com:9443/ws/ethusdt@trade";
const tradesocket = new WebSocket(tradeurl);

const tradesElement = document.getElementById('trades');

var chart = LightweightCharts.createChart(document.getElementById('chart'), {
	width: 700,
    height: 500,
});
var candleSeries = chart.addCandlestickSeries();
var data = [
	{ time: '2018-10-19', open: 54.62, high: 55.50, low: 54.52, close: 54.90 },
	{ time: '2018-10-22', open: 55.08, high: 55.27, low: 54.61, close: 54.98 },
	{ time: '2018-10-23', open: 56.09, high: 57.47, low: 56.09, close: 57.21 },
	{ time: '2018-10-24', open: 57.00, high: 58.44, low: 56.41, close: 57.42 },
	{ time: '2018-10-25', open: 57.46, high: 57.63, low: 56.17, close: 56.43 },
	{ time: '2018-10-26', open: 56.26, high: 56.62, low: 55.19, close: 55.51 },
	{ time: '2018-10-29', open: 55.81, high: 57.15, low: 55.72, close: 56.48 },
	{ time: '2018-10-30', open: 56.92, high: 58.80, low: 56.92, close: 58.18 },
	{ time: '2018-10-31', open: 58.32, high: 58.32, low: 56.76, close: 57.09 },
	{ time: '2018-11-01', open: 56.98, high: 57.28, low: 55.55, close: 56.05 },
	{ time: '2018-11-02', open: 56.34, high: 57.08, low: 55.92, close: 56.63 },
	{ time: '2018-11-05', open: 56.51, high: 57.45, low: 56.51, close: 57.21 },
	{ time: '2018-11-06', open: 57.02, high: 57.35, low: 56.65, close: 57.21 },
	{ time: '2018-11-07', open: 57.55, high: 57.78, low: 57.03, close: 57.65 },
	{ time: '2018-11-08', open: 57.70, high: 58.44, low: 57.66, close: 58.27 },
	{ time: '2018-11-09', open: 58.32, high: 59.20, low: 57.94, close: 58.46 },
	{ time: '2018-11-12', open: 58.84, high: 59.40, low: 58.54, close: 58.72 },
];
candleSeries.setData(data);

console.log(tradesocket);

tradesocket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log(data);

    const type = data.e;
    
    if (type == 'trade') {
        console.log('got a trade');

        const tradeElement = document.createElement('div');
        var date = Date(data.e).toLocaleString();
        tradeElement.className = 'trade';
        tradeElement.innerHTML = `<b>${date}</b> <br>${data.p} <br>${data.q}`;
        tradesElement.appendChild(tradeElement);

        var elements = document.getElementsByClassName('trade');
        if (elements.length > 10) {
            tradesElement.removeChild(elements[0]);
        }
    }

}



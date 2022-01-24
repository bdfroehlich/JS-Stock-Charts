async function main() {
    // let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=e5284dd93deb41c3ab0a1b684e8a0066')
    // let responseText = await response.text();
    // console.log(responseText);
    // const { GME, MSFT, DIS, BNTX } = result;
    // const stocks = [GME, MSFT, DIS, BNTX];

    const { GME, MSFT, DIS, BNTX } = mockData;
    //object destructuring unpacks values from arrays or properties from objects into distinct variables
    const stocks = [GME, MSFT, DIS, BNTX];

    console.log(stocks);
    console.log(Chart);
    console.log(stocks[0].values);

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    stocks.forEach(stock => stock.values.reverse())
    //reversing the values in the stocks array

    //Time Chart - Chart has to be created after the data is fetched.
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            //Using map to transform the array of values objects into an array of the dates contained within the values array.
            //We can use stocks[0] because we will always have at least one stock and all of the stocks have data
            //from the same days. This will be the dates on our x axis.
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                //creating a legend with each of our symbols or tickers
                data: stock.values.map(value => parseFloat(value.high)),
                //grabbing the highest values from each day
                backgroundColor:  getColor(stock.meta.symbol),
                //calling the get color function to set a specific color for each symbol or ticker
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
}

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

main()
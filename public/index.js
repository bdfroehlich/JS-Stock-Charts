async function main() {
    // let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=e5284dd93deb41c3ab0a1b684e8a0066')
    // let result = await response.text();
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

    // let gmeStockOpen = stocks[0].values.map(value => value.open)
    // console.log(gmeStockOpen)

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
                //grabbing the highest values from each day, parseFloat converts the returned string value into a float
                backgroundColor:  getColor(stock.meta.symbol),
                //calling the get color function to set a specific color for each symbol or ticker
                borderColor: getColor(stock.meta.symbol),
            }))
        },
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            //using map to map over the stocks array of objects to grab each symbol and set it as a label
            datasets: [{
                label: 'Highest',
                //creating a legend with each of our symbols or tickers
                data: stocks.map(stock => findHighest(stock.values)),
                //grabbing the highest value from each symbol using the findHighest function
                backgroundColor:  stocks.map(stock => getColor(stock.meta.symbol)),
                //calling the get color function to set a specific color for each symbol or ticker
                borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
            }, {
                label: 'Lowest',
                //creating a legend with each of our symbols or tickers
                data: stocks.map(stock => findLowest(stock.values)),
                //grabbing the highest value from each symbol using the findHighest function
                backgroundColor:  stocks.map(stock => getColor(stock.meta.symbol)),
                //calling the get color function to set a specific color for each symbol or ticker
                borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
            }]
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

function findHighest(values){
    let highest = 0;
    values.forEach(value => {
        if (parseFloat(value.high) > highest) {
            highest = value.high
        }
    } )
    return highest
}

function findLowest(values){
    let lowest = 1000;
    values.forEach(value => {
        if (parseFloat(value.low) < lowest) {
            lowest = value.low
        }
    } )
    return lowest
}

main()
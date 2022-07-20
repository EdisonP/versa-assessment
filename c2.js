const axios = require("axios");
const symbolArray = ["BTC", "ETH", "XRP"];
const currencyArray = ["USD", "MYR"];

const api_url = "https://alpha-vantage.p.rapidapi.com/query";
const api_key = "e79d7e9983mshc39d988d165c7ccp17a614jsn24f04095fb67";
const api_host = "alpha-vantage.p.rapidapi.com",
  finalOutput = [];

function getCrypto(symbolTarget) {
  var priceUSD_res;
  var priceMYR_res;
  var rateUSDMYR_res;
  var date_res;
  var finalRes = {};

  getRate().then((rateUSDMYR_return) => {
    rateUSDMYR_res = rateUSDMYR_return;
    try {
      for (let i = 0; i < currencyArray.length; i++) {
        getPrice(symbolTarget, currencyArray[i]).then((price_res) => {
          switch (currencyArray[i]) {
            case "USD":
              priceUSD_res = price_res;
              break;
            case "MYR":
              priceMYR_res = price_res;
              break;
          }

          if (priceUSD_res != null && priceMYR_res != null) {
            finalRes = {
              symbol: symbolTarget,
              priceUSD: priceUSD_res,
              priceMYR: priceMYR_res,
              rateUSDMYR: rateUSDMYR_res,
              date: "bruh",
            };
            finalOutput.push(finalRes);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

function getRate() {
  return new Promise(function (resolve, reject) {
    const currencyRate = {
      method: "GET",
      url: api_url,
      params: {
        to_currency: currencyArray[1],
        function: "CURRENCY_EXCHANGE_RATE",
        from_currency: currencyArray[0],
      },
      headers: {
        "X-RapidAPI-Key": api_key,
        "X-RapidAPI-Host": api_host,
      },
    };
    axios
      .request(currencyRate)
      .then(function (response) {
        var res = response.data[Object.keys(response.data)[0]];
        rateUSDMYR_res = res[Object.keys(res)[8]];
        if (rateUSDMYR_res != null) {
          resolve(rateUSDMYR_res);
        } else {
          reject("Error fetching from API");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  });
}

function getPrice(symbolTarget, currencyTarget) {
  return new Promise(function (resolve, reject) {
    const req = {
      method: "GET",
      url: api_url,
      params: {
        from_currency: symbolTarget,
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: currencyTarget,
        datatype: "json",
        output_size: "compact",
      },
      headers: {
        "X-RapidAPI-Key": api_key,
        "X-RapidAPI-Host": api_host,
      },
    };

    axios
      .request(req)
      .then(function (response) {
        var res = response.data[Object.keys(response.data)[0]];
        var price_res = res[Object.keys(res)[8]];
        if (price_res != null) {
          resolve(parseFloat(price_res));
        } else {
          reject("Error fetching from API");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  });
}

function getDate() {}

function run() {
  // 3 requests per symbol
  getCrypto(symbolArray[0]);
  // console.log(output);
}

run();

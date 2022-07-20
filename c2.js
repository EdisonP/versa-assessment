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
  var date;
  var finalRes = {};

  getRate()
    .then((rateUSDMYR_return) => {
      rateUSDMYR_res = rateUSDMYR_return;
      try {
        // fetch currency rate
        //fetch cryptodata

        for (let i = 0; i < currencyArray.length; i++) {
          const req = {
            method: "GET",
            url: api_url,
            params: {
              from_currency: symbolTarget,
              function: "CURRENCY_EXCHANGE_RATE",
              to_currency: currencyArray[i],
              datatype: "json",
              output_size: "compact",
            },
            headers: {
              "X-RapidAPI-Key": api_key,
              "X-RapidAPI-Host": api_host,
            },
          };
          // send request to API
          axios
            .request(req)
            .then(function (response2) {
              res = response2.data[Object.keys(response2.data)[0]];
              let currency = JSON.stringify(res[Object.keys(res)[2]]);
              let date = JSON.stringify(res[Object.keys(res)[5]]);
              if (currency.toString == currencyArray[0].toString) {
                priceUSD_res = res[Object.keys(res)[4]];
              } else if (currency.toString == currencyArray[1].toString) {
                priceMYR_res = res[Object.keys(res)[4]];
              }
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      } catch (error) {
        console.log(error);
      }
    })
    .finally(() => {
      finalRes = {
        symbol: symbolTarget,
        priceUSD: priceUSD_res,
        priceMYR: priceMYR_res,
        rateUSDMYR: rateUSDMYR_res,
        date: "bruh",
      };
      console.log(finalRes);
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

function run() {
  // 3 requests per symbol
  getCrypto(symbolArray[0]);
  // console.log(output);
}

run();

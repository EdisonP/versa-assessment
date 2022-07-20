const axios = require("axios");
const symbolArray = ["BTC", "ETH", "XRP"];
const currencyArray = ["USD", "MYR"];

function getCrypto(symbol, currency) {
  const output = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      from_currency: symbol,
      function: "CURRENCY_EXCHANGE_RATE",
      to_currency: currency,
      datatype: "json",
      output_size: "compact",
    },
    headers: {
      "X-RapidAPI-Key": "e79d7e9983mshc39d988d165c7ccp17a614jsn24f04095fb67",
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };

  axios
    .request(output)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// async to execute all getCrypto()
getCrypto("BTC", "USD");

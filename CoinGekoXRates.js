// debug function
// function runnerXRates() {
//   Logger.log("Outputting the Eth/Pound x-rate");
//   Logger.log(getExchangeRateEthVsPound());
//   Logger.log(refreshCGCache());
// }  

const BASE_URL_RATES = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cmatic-network&vs_currencies=usd%2Cgbp";

// this function hits the API endpoint and puts a fresh copy of the data into the cache, and returns the JSON string
function refreshCGCache() {
  // create the cache object
  var cache = CacheService.getScriptCache();

  // CoinGeko url - throws random 429 responses, need to handle
  Logger.log("Hitting URL:" + BASE_URL_RATES);
  var result = UrlFetchApp.fetch(BASE_URL_RATES, { muteHttpExceptions: true });
  var resCode = result.getResponseCode();
  var resReturn;

  // based on the response code, do some stuff...
  switch(resCode) {
    case 200: // all good
    case 1015: // transfer limited (but OK)
      // the api has returned something useful, save it - the cache only holds strings...
      cache.put('exchange_rates_coingeko', result.getContentText(), 1500); // stale after 25 minutes
      Logger.log('Cache refreshed');
      resReturn = result.getContentText();
      break;
    case 429:
      // too many requests - no data returned...
      Logger.log('Too Many Requests');   
      resReturn = null;
      break;
    default:
      // Something else
      Logger.log('Something else - ' + result.getContentText());   
      resReturn = null;
      break;
  }  

  // return it
  return resReturn;
}  
  // This function grabs the current Eth and Matic prices vs GBP & USD
  function getExchangeRates() {
    var cache = CacheService.getScriptCache();
    var cached = cache.get('exchange_rates_coingeko');
    if (cached != null) {
      // return the data from the cache
      Logger.log('Returning data from the cache...'); 
      return cached;
    } else {
      // there is no cache for fx rate, go get it
      Logger.log('Reloading data into the cache, its expired...'); 
      return refreshCGCache();
    } 
  }

// abstraction to return any data you want from the cache based on field name
function getRateFromCache(from, to) {
  // Get the data from the cache
  contents = getExchangeRates();

  // if return isn't null, read it into a JSON object
  if(contents != null) {
    // Load it into a JSON object
    exchangeRateCache = JSON.parse(contents); 

    Logger.log("Data returned from the cache");  

    // return the field specified
    return exchangeRateCache[from][to];
  } else {
    // lets not pretend there is a rate...
    Logger.log("Error returned from the cache");
    return '#NA';
  }
}

/** 
 * Return the eth against the USD exchange rate
 * @return the rate of Eth vs US Dollars
 * @customfunction
 */
function getExchangeRateEthVsDollar() {
  return getRateFromCache('ethereum', 'usd');
}

/** 
 * Return the eth against the GBP exchange rate
 * @return the rate of Eth vs GBP
 * @customfunction
 */
function getExchangeRateEthVsPound() {
  return getRateFromCache('ethereum', 'gbp');
}

/** 
 * Return the Matic against the GBP exchange rate
 * @return the rate of Eth vs GBP
 * @customfunction
 */
function getExchangeRateMaticVsPound() {
  return getRateFromCache('matic-network', 'gbp');
}

/** 
 * Return the Matic against the USD exchange rate
 * @return the rate of Eth vs US Dollars
 * @customfunction
 */
function getExchangeRateMaticVsDollar() {
  return getRateFromCache('matic-network', 'usd');
}
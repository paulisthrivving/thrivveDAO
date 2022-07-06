// Debug function
// function runner() {
//   Logger.log("Trying to get the data from OpenSea for 'cryptodickbutts-s3'");
//   Logger.log(getOSTotalSupplyCollection('cryptodickbutts-s3'))
//   Logger.log(refreshOSCache('cryptodickbutts-s3'));
// }

const BASE_URL = "https://api.opensea.io/api/v1/collection/";

// this function hits the API endpoint and puts a fresh copy of the data into the cache, and returns the JSON string
function refreshOSCache(collection_slug) {
  // create the cache object
  var cache = CacheService.getScriptCache();

  // Otherwise...make a call to the OpenSea API
    var url = `${BASE_URL}${collection_slug}/stats`;
  Logger.log("Hitting URL:" + url);
  
  // hit the URL of the API endpoint
  var result = UrlFetchApp.fetch(url, { muteHttpExceptions: true }); // rate limited, so we don't want to keep loading it
  var resCode = result.getResponseCode();
  var resReturn;

  // based on the response code, do some stuff...
  switch(resCode) {
    case 200: // all good
    case 1015: // transfer limited
      // the api has returned something useful, save it..
      cache.put(collection_slug, result.getContentText(), 1500); // stale after 25 minutes
      Logger.log('Cache refreshed');
      resReturn = result.getContentText();
      break;
    case 429:
      // too many requests...
      Logger.log('Too Many Requests');   
      resReturn = null;
      break;
    default:
      Logger.log('Something else - ' + result.getContentText());   
      resReturn = null;
      break;
  }  

    // return it
    return resReturn; 
}

// This function rewrites the collection stats from OpenSea if expired or missing, otherwise return the JSON string tha makes it up
function getOSCollectionStats(collection_slug) {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(collection_slug);
  if (cached != null) {
    Logger.log("We have data in the cache for the collection slug - returing...");
    return cached;
  } else {
      // there is no cache for fx rate, go get it
      Logger.log('Reloading data into the cache, its expired...'); 
      return refreshOSCache(collection_slug);
    } 
}

// abstraction to return any data you want from the cache based on field name
function getOSDataFromCache(collection_slug, field_name) {
  // Get the data from the cache
  contents = getOSCollectionStats(collection_slug);

  // Load it into a JSON object
  openSeaCache = JSON.parse(contents); 

  // return the field specified
  return openSeaCache['stats'][field_name];
}

/** 
 * Return the floor price from the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the floor price of the collection on OpenSea
 * @customfunction
 */
function getOSFloorPriceCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'floor_price');
}
/** 
* Return the 1 day volume from the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the one-day volume (in Eth) of the collection on OpenSea
 * @customfunction
 */
function getOS1DayVolumeCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'one_day_volume');
}

/**
 * Return the average price in Eth from the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the average price in Eth of the collection on OpenSea
 * @customfunction
 */
function getOSAveragePriceCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'average_price');
}

/**
 * Return the total supply from the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the total available number of items in the collection on OpenSea
 * @customfunction
 */
function getOSTotalSupplyCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'total_supply');
}

/**
 * Return the number of owners from the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the total available number of items in the collection on OpenSea
 * @customfunction
 */
function getOSNumberOwnersCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'num_owners');
}

/**
 * Return the 1-day sales value (in Eth) of the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the the 1-day sales value (in Eth) of the collection on OpenSea
 * @customfunction
 */
function getOS1DaySalesCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'one_day_sales');
}

/**
 * Return the 1 day average price of the collection on Opensea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the the 1-day average price (in Eth) of the collection on OpenSea
 * @customfunction
 */
function getOS1DayAvgPriceCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'one_day_average_price');
}

/**
 * Return the 7 day volume from the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the the 7-day volume (in Eth) of the collection on OpenSea
 * @customfunction
 */
function getOS7DayVolumeCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'seven_day_volume');
}

/**
 * Return the 7 day change in the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the the 7-day change in the collection on OpenSea
 * @customfunction
 */
function getOS7DayChangeCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'seven_day_change');
}

/**
 * Return the 7 day sales (in Eth) of the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the the 7-day change of the collection on OpenSea
 * @customfunction
 */
function getOS7DaySalesCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'seven_day_sales');
}

/**
 * Return the 7 day average price for the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the 7 day average price (in Eth) for the collection on OpenSea
 * @customfunction
 */
function getOS7DayAvgPriceCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'seven_day_average_price');
}

/**
 * Return the 30 day volume of the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the 30 day volume (in Eth) of the collection on OpenSea
 * @customfunction
 */
function getOS30DayVolumeCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'thirty_day_volume');
}

/**
 * Return the 30 day change for the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the 30 day change for the collection on OpenSea
 * @customfunction
 */
function getOS30DayChangeCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'thirty_day_change');
}

/**
 * Return the 30 day sales for the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the 30 day sales (in Eth) for the collection on OpenSea
 * @customfunction
 */
function getOS30DaySalesCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'thirty_day_sales');
}

/**
 * Return the 30 day average price for the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the 30 day average price (in Eth) for the collection on OpenSea
 * @customfunction
 */
function getOS30DayAvgPriceCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'thirty_day_average_price');
}

/**
 * Return the total volume for the collection cache on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the total volume (in Eth) for the collection on OpenSea
 * @customfunction
 */
function getOSTotalVolumeCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'total_volume');
}

/**
 * Return the total sales for the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the total sales (in Eth) for the collection on OpenSea
 * @customfunction
 */
function getOSTotalSalesCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'total_sales');
}

/**
 * Return the market cap for the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the market cap (in Eth) for the collection on OpenSea
 * @customfunction
 */
function getOSMarketCapCollection(collection_slug) {
  return getOSDataFromCache(collection_slug, 'market_cap');
}
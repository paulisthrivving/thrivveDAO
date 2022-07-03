// Debug function
// function runner() {
//   Logger.log("Trying to get the data from open sea for 'tribe'");
//   Logger.log(getFloorPriceCollection('tribe-odyssey'))
// }

// This function rewrites the collection stats from OpenSea if expired or missing, otherwise return the JSON string tha makes it up
function getCollectionStats(collection_slug) {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(collection_slug);
  if (cached != null) {
    return cached;
  }

  // Otherwise...make a call to the OpenSea API
    var url = "https://api.opensea.io/api/v1/collection/" + collection_slug + "/stats";

  var result = UrlFetchApp.fetch(url); // rate limited, so we don't want to keep loading it
  var contents = result.getContentText();

  // put the JSON string in the cache
  cache.put(collection_slug, contents, 1500); // stale after 25 minutes
  return contents;
}

// abstraction to return any data you want from the cache based on field name
function getOpenSeaDataFromCache(collection_slug, field_name) {
  // Get the data from the cache
  contents = getCollectionStats(collection_slug);

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
function getFloorPriceCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'floor_price');
}
/** 
* Return the 1 day volume from the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the one-day volume (in Eth) of the collection on OpenSea
 * @customfunction
 */
function get1DayVolumeCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'one_day_volume');
}

/**
 * Return the average price in Eth from the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the average price in Eth of the collection on OpenSea
 * @customfunction
 */
function getAveragePriceCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'average_price');
}

/**
 * Return the total supply from the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the total available number of items in the collection on OpenSea
 * @customfunction
 */
function getTotalSupplyCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'total_supply');
}

/**
 * Return the number of owners from the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the total available number of items in the collection on OpenSea
 * @customfunction
 */
function getNumberOwnersCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'num_owners');
}

/**
 * Return the 1-day sales value (in Eth) of the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the the 1-day sales value (in Eth) of the collection on OpenSea
 * @customfunction
 */
function get1DaySalesCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'one_day_sales');
}

/**
 * Return the 1 day average price of the collection on Opensea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the the 1-day average price (in Eth) of the collection on OpenSea
 * @customfunction
 */
function get1DayAvgPriceCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'one_day_average_price');
}

/**
 * Return the 7 day volume from the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the the 7-day volume (in Eth) of the collection on OpenSea
 * @customfunction
 */
function get7DayVolumeCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'seven_day_volume');
}

/**
 * Return the 7 day change in the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the the 7-day change in the collection on OpenSea
 * @customfunction
 */
function get7DayChangeCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'seven_day_change');
}

/**
 * Return the 7 day sales (in Eth) of the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the the 7-day change of the collection on OpenSea
 * @customfunction
 */
function get7DaySalesCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'seven_day_sales');
}

/**
 * Return the 7 day average price for the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the 7 day average price (in Eth) for the collection on OpenSea
 * @customfunction
 */
function get7DayAvgPriceCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'seven_day_average_price');
}

/**
 * Return the 30 day volume of the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the 30 day volume (in Eth) of the collection on OpenSea
 * @customfunction
 */
function get30DayVolumeCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'thirty_day_volume');
}

/**
 * Return the 30 day change for the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the 30 day change for the collection on OpenSea
 * @customfunction
 */
function get30DayChangeCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'thirty_day_change');
}

/**
 * Return the 30 day sales for the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the 30 day sales (in Eth) for the collection on OpenSea
 * @customfunction
 */
function get30DaySalesCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'thirty_day_sales');
}

/**
 * Return the 30 day average price for the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the 30 day average price (in Eth) for the collection on OpenSea
 * @customfunction
 */
function get30DayAvgPriceCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'thirty_day_average_price');
}

/**
 * Return the total volume for the collection cache on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the total volume (in Eth) for the collection on OpenSea
 * @customfunction
 */
function getTotalVolumeCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'total_volume');
}

/**
 * Return the total sales for the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the total sales (in Eth) for the collection on OpenSea
 * @customfunction
 */
function getTotalSalesCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'total_sales');
}

/**
 * Return the market cap for the collection on OpenSea
 * @param {string} the 'collection slug' of the OpenSea collection
 * @return the market cap (in Eth) for the collection on OpenSea
 * @customfunction
 */
function getMarketCapCollection(collection_slug) {
  return getOpenSeaDataFromCache(collection_slug, 'market_cap');
}
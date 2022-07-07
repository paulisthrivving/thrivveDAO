// Debug function
// function runnerME() {
//   Logger.log("Trying to get the data from Magic Eden for 'yeah tigers'");
//   Logger.log(getMEFloorPriceCollection('yeah_tigers'))
//   Logger.log(getMEAvgPriceCollection('yeah_tigers'));
//   Logger.log(getMEListedCountCollection('yeah_tigers'));
//   Logger.log(getMETotalVolCollection('yeah_tigers'));
// }

const BASE_URL_MAGIC = 'https://api-mainnet.magiceden.dev/v2/collections/';

// This function rewrites the collection stats from OpenSea if expired or missing, otherwise return the JSON string tha makes it up
function getMECollectionStats(collection_symbol) {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(collection_symbol);
  if (cached != null) {
    Logger.log("We have data in the cache for the contract - returing...");
    return cached;
  }

  // Otherwise...make a call to the Magic Eden API
  var url = `${BASE_URL_MAGIC}${collection_symbol}/stats`;

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
      cache.put(collection_symbol, result.getContentText(), 1500); // stale after 25 minutes
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

// abstraction to return any data you want from the cache based on field name
function getMEDataFromCache(collection_symbol, field_name) {
  // Get the data from the cache
  contents = getMECollectionStats(collection_symbol);

  // Load it into a JSON object
  magicEdenCache = JSON.parse(contents); 

  // return the field specified
  return magicEdenCache[field_name];
}

// Convert price to readable Solana value
function convertSolana(price) {
  return (price/10e8);
}

/** 
 * Return the floor price from the collection on MagicEden
 * @param {string} the 'contract address' of the MagicEden collection
 * @return the floor price of the collection on MagicEden
 * @customfunction
 */
function getMEFloorPriceCollection(collection_symbol) {
  return convertSolana(getMEDataFromCache(collection_symbol, 'floorPrice'));
}

/** 
 * Return the average price achieved in the last 24h received for the collection on MagicEden
 * @param {string} the 'collection symbol' of the MagicEden collection
 * @return the floor price of the collection on MagicEden
 * @customfunction
 */
function getMEAvgPriceCollection(collection_symbol) {
  return convertSolana(getMEDataFromCache(collection_symbol, 'avgPrice24hr'));
}

/** 
 * Return the listed count for the collection on MagicEden
 * @param {string} the 'collection symbol' of the MagicEden collection
 * @return the listed count for the collection on MagicEden
 * @customfunction
 */
function getMEListedCountCollection(collection_symbol) {
  return getMEDataFromCache(collection_symbol, 'listedCount');
}

/** 
 * Return the total volume achieved for the collection on MagicEden
 * @param {string} the 'collection symbol' of the MagicEden collection
 * @return the total volume achieved for the collection on MagicEden
 * @customfunction
 */
function getMETotalVolCollection(collection_symbol) {
  return convertSolana(getMEDataFromCache(collection_symbol, 'volumeAll'));
}
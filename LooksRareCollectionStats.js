// Debug function
// function runnerLR() {
//   Logger.log("Trying to get the data from LooksRare for 'xPunks'");
//   Logger.log(getLRFloorPriceCollection('0x0D0167A823C6619D430B1a96aD85B888bcF97C37'))
// }

const BASE_URL_LR ="https://api.looksrare.org/api/v1/collections/stats?address=";

// this function hits the API endpoint and puts a fresh copy of the data into the cache, and returns the JSON string
function refreshLRCache(contract_address) {
  var cache = CacheService.getScriptCache();

  // Otherwise...make a call to the LooksRare API
  var url = `${BASE_URL_LR}${contract_address}`;

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
      cache.put(contract_address, result.getContentText(), 1500); // stale after 25 minutes
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
function getLRCollectionStats(contract_address) {
  var cache = CacheService.getScriptCache();
  var cached = cache.get(contract_address);
  if (cached != null) {
    Logger.log("We have data in the cache for the contract - returing...");
    return cached;
  } else {
    return refreshLRCache(contract_address);
  }  
}

// abstraction to return any data you want from the cache based on field name
function getLRDataFromCache(contract_address, field_name) {
  // Get the data from the cache
  contents = getLRCollectionStats(contract_address);

  // Load it into a JSON object
  looksRareCache = JSON.parse(contents); 

  // return the field specified
  return looksRareCache['data'][field_name];
}

// Convert wei to ETH
function convertWeiToEth(wei) {
  return (wei/10e17);
}

/** 
 * Return the floor price from the collection on LooksRare
 * @param {string} the 'contract address' of the LooksRare collection
 * @return the floor price of the collection on LooksRare
 * @customfunction
 */
function getLRFloorPriceCollection(contract_address) {
  return convertWeiToEth(getLRDataFromCache(contract_address, 'floorPrice'));
}
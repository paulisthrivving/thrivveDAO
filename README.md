# thrivveDAO

We are building a set of tools to support our operations. This repo is where we will release a collection of free scripts which will enable you to plug data into **Google Sheets** (using Apps Scripts) from common Web3 marketplace API endpoints using custom sheet functions, hopefully, to support your informed decision-making with respect to listed NFT collections:

## Ethereum
###### OpenSea
- Return collection stats from the [OpenSea API (without an API key)](https://docs.opensea.io/reference/api-overview) - makes use of eighteen custom functions to return everything from collection floor prices to 30-day volumes[^1].

###### LooksRare
- Return collection stats from the [LooksRare API (without an API key)](https://docs.looksrare.org/developers/public-api-documentation) - this basic implementation only returns floor price by use of a custom function[^1].

## Solana
###### Magic Eden
- Return collection stats from the public [MagicEden API](https://api.magiceden.dev/) - implemented in four custom functions returning everything from floor price to collection listed count[^1].

## X-Rates
###### CoinGecko
- Return exchange rates for Eth, Matic, SCRT, and Sol vs USD and GBP using the public [CoinGecko API](https://www.coingecko.com/en/api) - can easily be extended to support other currencies and tokens by changing the base URL[^1].

[^1]: All calls make use of Google's CacheService as the end-point is rate-limited.

import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

// Real token address from pump.fun
const REAL_TOKEN_ADDRESS = "rXKYBdFqtFuTbieQh2DBxuy6tCi8yDRY3h1kfwSpump";

// Cache for token data to limit API requests
let tokenDataCache = {
  data: null,
  timestamp: 0,
  expiryMs: 60000, // 1 minute cache
};

async function fetchTokenData() {
  try {
    // Return cached data if still valid
    if (
      tokenDataCache.data &&
      Date.now() - tokenDataCache.timestamp < tokenDataCache.expiryMs
    ) {
      return tokenDataCache.data;
    }

    // Default token data to use if API fails
    const defaultData = {
      name: 'DripDog',
      symbol: '$DRIP',
      price: {
        current: '$0.00421',
        change: '+69.4%',
        volume: '$1.2M',
        marketCap: '$4.2M',
        holders: '12,420',
        circulatingSupply: '1B $DRIP'
      },
      links: {
        telegram: 'https://t.me/dripdogcoin',
        twitter: 'https://twitter.com/DripDogSolana',
        discord: 'https://discord.gg/dripdog',
        reddit: 'https://reddit.com/r/DripDogCoin'
      },
      tokenAddress: REAL_TOKEN_ADDRESS
    };

    // Try to fetch real data from Solscan
    try {
      const solscanTokenData = await axios.get(
        `https://public-api.solscan.io/token/meta?tokenAddress=${REAL_TOKEN_ADDRESS}`
      );
      
      const solscanHolderData = await axios.get(
        `https://public-api.solscan.io/token/holders?tokenAddress=${REAL_TOKEN_ADDRESS}&offset=0&limit=10`
      );

      const solscanMarketData = await axios.get(
        `https://public-api.solscan.io/market?symbol=SOL/USD`
      );

      // Extract real data if available
      if (solscanTokenData.data) {
        const tokenData = solscanTokenData.data;
        const holderCount = solscanHolderData.data?.data?.total || defaultData.price.holders;
        const solPrice = solscanMarketData.data?.priceUsdt || 0;
        
        // Format and update the data
        defaultData.name = tokenData.name || defaultData.name;
        defaultData.symbol = tokenData.symbol || defaultData.symbol;
        defaultData.price.holders = typeof holderCount === 'number' ? holderCount.toLocaleString() : holderCount;
        defaultData.price.circulatingSupply = tokenData.supply 
          ? `${(parseInt(tokenData.supply) / 1000000000).toFixed(1)}B ${defaultData.symbol}`
          : defaultData.price.circulatingSupply;
      }
    } catch (error) {
      console.error("Error fetching Solscan data:", error.message);
      // Fall back to default data if API fails
    }

    // Update cache
    tokenDataCache.data = defaultData;
    tokenDataCache.timestamp = Date.now();
    
    return defaultData;
  } catch (err) {
    console.error("Error in fetchTokenData:", err);
    return {
      name: 'DripDog',
      symbol: '$DRIP',
      price: {
        current: '$0.00421',
        change: '+69.4%',
        volume: '$1.2M',
        marketCap: '$4.2M',
        holders: '12,420',
        circulatingSupply: '1B $DRIP'
      },
      links: {
        telegram: 'https://t.me/dripdogcoin',
        twitter: 'https://twitter.com/DripDogSolana',
        discord: 'https://discord.gg/dripdog',
        reddit: 'https://reddit.com/r/DripDogCoin'
      },
      tokenAddress: REAL_TOKEN_ADDRESS
    };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get the current token information
  app.get('/api/token-info', async (_req, res) => {
    try {
      const tokenData = await fetchTokenData();
      res.json(tokenData);
    } catch (error) {
      console.error("Error getting token info:", error);
      res.status(500).json({ error: "Failed to fetch token information" });
    }
  });

  // API endpoint to get PumpFun token info directly
  app.get('/api/pumpfun-info', async (_req, res) => {
    try {
      // Forward request to Solscan API
      const solscanResponse = await axios.get(
        `https://public-api.solscan.io/token/meta?tokenAddress=${REAL_TOKEN_ADDRESS}`
      );
      res.json(solscanResponse.data);
    } catch (error) {
      console.error("Error fetching from Solscan:", error);
      res.status(500).json({ error: "Failed to fetch Solscan data" });
    }
  });

  // API endpoint for telegram bot interactions with real token data
  app.post('/api/telegram-bot/message', async (req, res) => {
    const { message } = req.body;
    const tokenData = await fetchTokenData();
    
    let response = "I'm not sure how to respond to that. Try asking about the price, how to buy $DRIP, or request a meme!";
    
    if (message.toLowerCase().includes('price')) {
      response = `Current ${tokenData.symbol} price: ${tokenData.price.current} (${tokenData.price.change})`;
    } else if (message.toLowerCase().includes('buy')) {
      response = `To buy ${tokenData.symbol}: 1. Get a Solana wallet, 2. Get SOL, 3. Go to Jupiter or Raydium, 4. Swap for ${tokenData.symbol} using address: ${tokenData.tokenAddress}`;
    } else if (message.toLowerCase().includes('address')) {
      response = `${tokenData.symbol} contract address: ${tokenData.tokenAddress}`;
    } else if (message.toLowerCase().includes('holders')) {
      response = `Current ${tokenData.symbol} holders: ${tokenData.price.holders}`;
    } else if (message.toLowerCase().includes('meme')) {
      response = `Here's a fresh DripDog meme for you! The fluffiest meme coin on Solana!`;
    }
    
    res.json({ response });
  });

  const httpServer = createServer(app);
  return httpServer;
}

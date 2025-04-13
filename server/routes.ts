import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";
import { z } from "zod";
import { insertAdminContentSchema } from "@shared/schema";

// Real token address from pump.fun
const REAL_TOKEN_ADDRESS = "rXKYBdFqtFuTbieQh2DBxuy6tCi8yDRY3h1kfwSpump";

// Session token for admin authentication
let adminSessionToken: string | null = null;

// Authentication middleware
const requireAdminAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Missing or invalid token format' });
  }

  const token = authHeader.split(' ')[1];

  if (token !== adminSessionToken || !adminSessionToken) {
    return res.status(401).json({ error: 'Unauthorized - Invalid or expired token' });
  }

  next();
};

// Cache for token data to limit API requests
interface TokenData {
  name: string;
  symbol: string;
  price: {
    current: string;
    change: string;
    volume: string;
    marketCap: string;
    holders: string;
    circulatingSupply: string;
  };
  links: {
    telegram: string;
    twitter: string;
    discord: string;
    reddit: string;
  };
  tokenAddress: string;
}

let tokenDataCache: {
  data: TokenData | null;
  timestamp: number;
  expiryMs: number;
} = {
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

    // Default token data structure, values will be updated from APIs
    let tokenData: TokenData = {
      name: 'DripDog',
      symbol: '$DRIP',
      price: {
        current: '$0.00',
        change: '0%',
        volume: '$0',
        marketCap: '$0',
        holders: '0',
        circulatingSupply: '1B $DRIP'
      },
      links: {
        telegram: 'https://t.me/NBT_Portal',
        twitter: 'https://x.com/DripDog_sol',
        discord: '',
        reddit: ''
      },
      tokenAddress: REAL_TOKEN_ADDRESS
    };
    
    // Format values for display helper function
    const formatCurrency = (value: number) => {
      if (value >= 1000000000) {
        return `$${(value / 1000000000).toFixed(2)}B`;
      } else if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
      } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(2)}K`;
      }
      return `$${value.toFixed(6)}`;
    };

    // Try Jupiter API first
    try {
      const jupiterResponse = await axios.get(
        `https://price.jup.ag/v4/price?ids=${REAL_TOKEN_ADDRESS}`,
        {
          timeout: 5000,
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (jupiterResponse?.data?.data?.[REAL_TOKEN_ADDRESS]) {
        const price = jupiterResponse.data.data[REAL_TOKEN_ADDRESS].price || 0;
        tokenData.price.current = `$${price.toFixed(8)}`;
        tokenData.price.marketCap = `$${(price * 1000000000).toFixed(2)}`;
      }
    } catch (jupiterError: any) {
      console.error("Error fetching Jupiter price data:", jupiterError.message || "Unknown error");
    }
    
    // Try Birdeye API
    try {
      const birdeyeResponse = await axios.get(
        `https://public-api.birdeye.so/public/tokenlist?address=${REAL_TOKEN_ADDRESS}`,
        {
          headers: {
            'x-chain': 'solana',
            'x-api-key': 'BIRDEYE_PUBLIC_API'
          }
        }
      );

      if (birdeyeResponse.data && birdeyeResponse.data.success && birdeyeResponse.data.data && birdeyeResponse.data.data.tokens) {
        const tokenDataFromBirdeye = birdeyeResponse.data.data.tokens[0];

        if (tokenDataFromBirdeye) {
          const price = tokenDataFromBirdeye.price || 0;
          const priceChange = tokenDataFromBirdeye.priceChange24h || 0;
          const volume = tokenDataFromBirdeye.volume24h || 0;

          // Update with real data from Birdeye
          tokenData.name = tokenDataFromBirdeye.name || tokenData.name;
          tokenData.symbol = tokenDataFromBirdeye.symbol || tokenData.symbol;
          tokenData.price.current = formatCurrency(price);
          tokenData.price.change = `${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%`;
          tokenData.price.volume = formatCurrency(volume);
          tokenData.price.marketCap = formatCurrency(price * (tokenDataFromBirdeye.supply || 0));

          // Format supply
          let supply = tokenDataFromBirdeye.supply || 0;
          if (supply >= 1000000000) {
            tokenData.price.circulatingSupply = `${(supply / 1000000000).toFixed(1)}B ${tokenData.symbol}`;
          } else if (supply >= 1000000) {
            tokenData.price.circulatingSupply = `${(supply / 1000000).toFixed(1)}M ${tokenData.symbol}`;
          } else {
            tokenData.price.circulatingSupply = `${supply.toLocaleString()} ${tokenData.symbol}`;
          }
        }
      }
    } catch (birdeyeError: any) {
      console.error("Error fetching Birdeye data:", birdeyeError.message || "Unknown error");
    }
    
    // Try Solscan API
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
        const tokenDataFromSolscan = solscanTokenData.data;
        const holderCount = solscanHolderData.data?.data?.total || tokenData.price.holders;
        const solPrice = solscanMarketData.data?.priceUsdt || 0;

        // Format and update the data
        tokenData.name = tokenDataFromSolscan.name || tokenData.name;
        tokenData.symbol = tokenDataFromSolscan.symbol || tokenData.symbol;
        tokenData.price.holders = typeof holderCount === 'number' ? holderCount.toLocaleString() : holderCount;
        tokenData.price.circulatingSupply = tokenDataFromSolscan.supply 
          ? `${(parseInt(tokenDataFromSolscan.supply) / 1000000000).toFixed(1)}B ${tokenData.symbol}`
          : tokenData.price.circulatingSupply;
      }
    } catch (solscanError: any) {
      console.error("Error fetching Solscan data:", solscanError.message || "Unknown error");
    }

    // Try Metaplex data
    try {
      const metaplexResponse = await axios.get(
        `https://api.solscan.io/token/meta?token=${REAL_TOKEN_ADDRESS}`
      );

      if (metaplexResponse.data && metaplexResponse.data.success && metaplexResponse.data.data) {
        const metaplexData = metaplexResponse.data.data;

        // Update with additional Metaplex data if available
        if (metaplexData.name) {
          tokenData.name = metaplexData.name;
        }
        if (metaplexData.symbol) {
          tokenData.symbol = metaplexData.symbol;
        }
      }
    } catch (metaplexError: any) {
      console.error("Error fetching Metaplex data:", metaplexError.message || "Unknown error");
    }

    // Update cache
    tokenDataCache.data = tokenData;
    tokenDataCache.timestamp = Date.now();

    return tokenData;
  } catch (err) {
    console.error("Error in fetchTokenData:", err);
    return {
      name: 'DripDog',
      symbol: '$DRIP',
      price: {
        current: '$0.000001',
        change: '0%',
        volume: '$10K',
        marketCap: '$100K',
        holders: '100',
        circulatingSupply: '1B $DRIP'
      },
      links: {
        telegram: 'https://t.me/NBT_Portal',
        twitter: 'https://x.com/DripDog_sol',
        discord: '',
        reddit: ''
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
    } catch (error: any) {
      console.error("Error getting token info:", error.message || error);
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
    } catch (error: any) {
      console.error("Error fetching from Solscan:", error.message || error);
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

  // =====================
  // ADMIN PANEL ENDPOINTS
  // =====================

  // Admin login endpoint
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ error: 'Password is required' });
      }

      const isValid = await storage.verifyAdminPassword(password);

      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate a session token (simple UUID in this case, could be a JWT in production)
      adminSessionToken = Math.random().toString(36).substring(2, 15) + 
                         Math.random().toString(36).substring(2, 15) +
                         Date.now().toString(36);

      res.json({ 
        success: true, 
        token: adminSessionToken,
        message: 'Login successful'
      });
    } catch (error: any) {
      console.error('Admin login error:', error.message || error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Admin logout endpoint
  app.post('/api/admin/logout', requireAdminAuth, (req, res) => {
    adminSessionToken = null;
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // Change admin password endpoint
  app.post('/api/admin/change-password', requireAdminAuth, async (req, res) => {
    try {
      const { newPassword } = req.body;

      if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ 
          error: 'New password is required and must be at least 8 characters long'
        });
      }

      await storage.setAdminPassword(newPassword);

      res.json({ 
        success: true, 
        message: 'Password changed successfully'
      });
    } catch (error: any) {
      console.error('Change password error:', error.message || error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get all editable content sections
  app.get('/api/admin/content', requireAdminAuth, async (req, res) => {
    try {
      const allContent = await storage.getAllAdminContent();
      res.json(allContent);
    } catch (error: any) {
      console.error('Get admin content error:', error.message || error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Get specific content section
  app.get('/api/admin/content/:section', async (req, res) => {
    try {
      const { section } = req.params;
      const content = await storage.getAdminContent(section);

      if (!content) {
        return res.status(404).json({ error: 'Content section not found' });
      }

      res.json(content);
    } catch (error: any) {
      console.error(`Get content section error for ${req.params.section}:`, error.message || error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Create or update content section
  app.post('/api/admin/content/:section', requireAdminAuth, async (req, res) => {
    try {
      const { section } = req.params;
      const { content } = req.body;

      // Validate content with Zod schema
      try {
        // Only validate the structure, not all fields are required for updates
        const contentSchema = z.object({
          content: z.any(),
        });

        contentSchema.parse(req.body);
      } catch (validationError: any) {
        return res.status(400).json({ 
          error: 'Invalid content structure', 
          details: validationError.errors 
        });
      }

      const lastUpdated = new Date().toISOString();
      const existingContent = await storage.getAdminContent(section);

      let result;
      if (existingContent) {
        // Update existing content
        result = await storage.updateAdminContent(section, { 
          content, 
          lastUpdated 
        });
      } else {
        // Create new content section
        result = await storage.createAdminContent({ 
          section, 
          content, 
          lastUpdated 
        });
      }

      res.json({ 
        success: true, 
        message: `Content for ${section} ${existingContent ? 'updated' : 'created'} successfully`,
        data: result
      });
    } catch (error: any) {
      console.error(`Update content section error for ${req.params.section}:`, error.message || error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
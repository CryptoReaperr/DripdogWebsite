import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get the current token information
  app.get('/api/token-info', (_req, res) => {
    res.json({
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
      tokenAddress: 'dr1pDRipdRipDr1pDRip123456789abcdefgHJKLm'
    });
  });

  // API endpoint for telegram bot interactions (simplified)
  app.post('/api/telegram-bot/message', (req, res) => {
    const { message } = req.body;
    
    let response = "I'm not sure how to respond to that. Try asking about the price, how to buy $DRIP, or request a meme!";
    
    if (message.toLowerCase().includes('price')) {
      response = "Current $DRIP price: $0.00421 (+69.4%)";
    } else if (message.toLowerCase().includes('buy')) {
      response = "To buy $DRIP: 1. Get a Solana wallet, 2. Get SOL, 3. Go to Jupiter or Raydium, 4. Swap for $DRIP";
    } else if (message.toLowerCase().includes('meme')) {
      response = "Here's a fresh DripDog meme for you!";
    }
    
    res.json({ response });
  });

  const httpServer = createServer(app);

  return httpServer;
}

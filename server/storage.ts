import { 
  users, type User, type InsertUser,
  adminContent, type AdminContent, type InsertAdminContent,
  adminSettings, type AdminSettings, type InsertAdminSettings
} from "@shared/schema";
import bcrypt from "bcryptjs";
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { eq } from 'drizzle-orm';

const { Pool } = pg;

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Admin content operations
  getAdminContent(section: string): Promise<AdminContent | undefined>;
  getAllAdminContent(): Promise<AdminContent[]>;
  createAdminContent(content: InsertAdminContent): Promise<AdminContent>;
  updateAdminContent(section: string, content: Partial<InsertAdminContent>): Promise<AdminContent | undefined>;
  
  // Admin settings operations
  getAdminSettings(): Promise<AdminSettings | undefined>;
  setAdminPassword(password: string): Promise<AdminSettings>;
  verifyAdminPassword(password: string): Promise<boolean>;
  
  // Initialize database tables
  initializeTables(): Promise<void>;
}

// Initialize database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const db = drizzle(pool);

export class DBStorage implements IStorage {
  constructor() {
    // Initialize database tables automatically
    this.initializeTables();
  }

  // Initialize tables and set default admin password
  async initializeTables(): Promise<void> {
    try {
      // Check if admin settings exist, if not create with default password
      const adminSettingsData = await this.getAdminSettings();
      if (!adminSettingsData) {
        console.log('Setting up default admin password...');
        await this.setAdminPassword('dripdog123');
      }
    } catch (error) {
      console.error('Error initializing database tables:', error);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0];
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.username, username));
      return result[0];
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const result = await db.insert(users).values(insertUser).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  // Admin content methods
  async getAdminContent(section: string): Promise<AdminContent | undefined> {
    try {
      const result = await db.select().from(adminContent).where(eq(adminContent.section, section));
      return result[0];
    } catch (error) {
      console.error(`Error getting admin content for section ${section}:`, error);
      return undefined;
    }
  }
  
  async getAllAdminContent(): Promise<AdminContent[]> {
    try {
      return await db.select().from(adminContent);
    } catch (error) {
      console.error('Error getting all admin content:', error);
      return [];
    }
  }
  
  async createAdminContent(content: InsertAdminContent): Promise<AdminContent> {
    try {
      const result = await db.insert(adminContent).values(content).returning();
      return result[0];
    } catch (error) {
      console.error('Error creating admin content:', error);
      throw error;
    }
  }
  
  async updateAdminContent(section: string, content: Partial<InsertAdminContent>): Promise<AdminContent | undefined> {
    try {
      // Check if content exists
      const existingContent = await this.getAdminContent(section);
      
      if (!existingContent) {
        return undefined;
      }
      
      // Set lastUpdated if not provided
      if (!content.lastUpdated) {
        content.lastUpdated = new Date().toISOString();
      }
      
      // Update content
      const result = await db
        .update(adminContent)
        .set(content)
        .where(eq(adminContent.section, section))
        .returning();
        
      return result[0];
    } catch (error) {
      console.error(`Error updating admin content for section ${section}:`, error);
      return undefined;
    }
  }
  
  // Admin settings methods
  async getAdminSettings(): Promise<AdminSettings | undefined> {
    try {
      const result = await db.select().from(adminSettings).limit(1);
      return result[0];
    } catch (error) {
      console.error('Error getting admin settings:', error);
      return undefined;
    }
  }
  
  async setAdminPassword(password: string): Promise<AdminSettings> {
    try {
      // Hash the password with bcrypt
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      
      // Check if admin settings already exist
      const existingSettings = await this.getAdminSettings();
      
      if (existingSettings) {
        // Update existing settings
        const result = await db
          .update(adminSettings)
          .set({ adminPassword: hashedPassword })
          .where(eq(adminSettings.id, existingSettings.id))
          .returning();
          
        return result[0];
      } else {
        // Create new settings
        const result = await db
          .insert(adminSettings)
          .values({ adminPassword: hashedPassword })
          .returning();
          
        return result[0];
      }
    } catch (error) {
      console.error('Error setting admin password:', error);
      throw error;
    }
  }
  
  async verifyAdminPassword(password: string): Promise<boolean> {
    try {
      const settings = await this.getAdminSettings();
      
      if (!settings) {
        return false;
      }
      
      return bcrypt.compareSync(password, settings.adminPassword);
    } catch (error) {
      console.error('Error verifying admin password:', error);
      return false;
    }
  }
}

// For backward compatibility, we'll keep the MemStorage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private adminContents: Map<string, AdminContent>;
  private adminSettingsData: AdminSettings | undefined;
  
  currentUserId: number;
  currentAdminContentId: number;
  currentAdminSettingsId: number;

  constructor() {
    this.users = new Map();
    this.adminContents = new Map();
    this.currentUserId = 1;
    this.currentAdminContentId = 1;
    this.currentAdminSettingsId = 1;
    
    // Initialize with default admin password (bcrypt hash for 'dripdog123')
    this.setAdminPassword('dripdog123');
  }

  // Implementation required by IStorage interface
  async initializeTables(): Promise<void> {
    // No-op for MemStorage
    return;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Admin content methods
  async getAdminContent(section: string): Promise<AdminContent | undefined> {
    return this.adminContents.get(section);
  }
  
  async getAllAdminContent(): Promise<AdminContent[]> {
    return Array.from(this.adminContents.values());
  }
  
  async createAdminContent(content: InsertAdminContent): Promise<AdminContent> {
    const id = this.currentAdminContentId++;
    const adminContent: AdminContent = { ...content, id };
    this.adminContents.set(content.section, adminContent);
    return adminContent;
  }
  
  async updateAdminContent(section: string, content: Partial<InsertAdminContent>): Promise<AdminContent | undefined> {
    const existingContent = this.adminContents.get(section);
    
    if (!existingContent) {
      return undefined;
    }
    
    const updatedContent: AdminContent = {
      ...existingContent,
      ...content,
      lastUpdated: content.lastUpdated || new Date().toISOString()
    };
    
    this.adminContents.set(section, updatedContent);
    return updatedContent;
  }
  
  // Admin settings methods
  async getAdminSettings(): Promise<AdminSettings | undefined> {
    return this.adminSettingsData;
  }
  
  async setAdminPassword(password: string): Promise<AdminSettings> {
    // Hash the password with bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    // Create or update admin settings
    if (this.adminSettingsData) {
      this.adminSettingsData.adminPassword = hashedPassword;
      return this.adminSettingsData;
    } else {
      const id = this.currentAdminSettingsId++;
      const settings: AdminSettings = {
        id,
        adminPassword: hashedPassword
      };
      this.adminSettingsData = settings;
      return settings;
    }
  }
  
  async verifyAdminPassword(password: string): Promise<boolean> {
    if (!this.adminSettingsData) {
      return false;
    }
    
    return bcrypt.compareSync(password, this.adminSettingsData.adminPassword);
  }
}

// Switch to the Postgres database storage implementation
export const storage = new DBStorage();

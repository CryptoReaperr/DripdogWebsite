import { 
  users, type User, type InsertUser,
  adminContent, type AdminContent, type InsertAdminContent,
  adminSettings, type AdminSettings, type InsertAdminSettings
} from "@shared/schema";
import bcrypt from "bcryptjs";

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
}

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

export const storage = new MemStorage();

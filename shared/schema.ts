import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface Market {
  id: string;
  title: string;
  platform: string;
  category: string;
  volume24h: number;
  totalVolume: number;
  probability: number;
  endDate: string;
  liquidity: number;
  chain: string;
  participants: number;
  trending: boolean;
}

export interface Opportunity {
  id: string;
  marketId: string;
  title: string;
  platform: string;
  currentOdds: number;
  impliedProbability: number;
  estimatedTrueProb: number;
  edge: number;
  potentialReturn: number;
  riskRewardRatio: number;
  confidence: number;
  timeLeft: string;
  category: string;
  chain: string;
}

export interface BridgeStatus {
  id: string;
  sourceChain: string;
  targetChain: string;
  status: 'active' | 'pending' | 'processing' | 'completed';
  throughput: number;
  latency: number;
  volume24h: number;
  transactions: number;
  validators: number;
  health: number;
}

export interface LiquidityPool {
  id: string;
  pair: string;
  tvl: number;
  apy: number;
  volume24h: number;
  utilizationRate: number;
  chain: string;
}

export interface TelemetryData {
  timestamp: number;
  tps: number;
  blockHeight: number;
  validatorCount: number;
  networkLoad: number;
  bridgeVolume: number;
  activeMarkets: number;
  totalValueLocked: number;
}

export interface AggregatedStats {
  totalMarkets: number;
  totalVolume24h: number;
  totalValueLocked: number;
  activeBridges: number;
  avgLatency: number;
  successRate: number;
  pendingTransactions: number;
  solanaPrice: number;
}

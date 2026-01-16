import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from "dotenv";
import { relations } from './relations';
import { DrizzleConfig } from 'drizzle-orm';

dotenv.config({ path: ".env.local" });

export const db = drizzle(
  process.env.DATABASE_URL!,
  { relations } as DrizzleConfig<typeof relations>
);

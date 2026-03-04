import { pool } from "../config/database";

export const query = (text: string, params?: unknown[]) => {
  return pool.query(text, params);
};

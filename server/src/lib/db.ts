import { config } from "dotenv-safe";
import { Pool } from "pg";

import { logger } from "./logger";

config();

const pool = new Pool();

logger.info(
	`database connected to ${process.env.PGUSER}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
);

export default {
	query: async (text: string, params?: any[]) => {
		const start = Date.now();
		const res = await pool.query(text, params);

		logger
			.child({
				query: text,
				parameters: params,
				delay: `${Date.now() - start}ms`,
				"row(s)": res.rowCount
			})
			.info(`executed query`);

		return res;
	}
};

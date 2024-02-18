import { z } from "zod";

import db from "../lib/db";
import { procedure, router } from "../lib/trpc";
import { getUser } from "../lib/utils";

export const imageRouter = router({
	mine: procedure.query(async ({ ctx }) => {
		const user = await getUser(ctx);

		const res = await db.query("SELECT * FROM images WHERE user_id = $1;", [
			user.id
		]);

		return res.rows;
	}),
	view: procedure.input(z.string()).query(async ({ input }) => {
		const res = await db.query("SELECT * FROM images WHERE user_id = $1;", [
			input
		]);

		return res.rows;
	})
});

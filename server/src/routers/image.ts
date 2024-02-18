import db from "../lib/db";
import { procedure, router } from "../lib/trpc";
import { getUser } from "../lib/utils";

export const imageRouter = router({
	mine: procedure.query(async ({ ctx }) => {
		const user = await getUser(ctx);

		console.log(user.id);

		const res = await db.query("SELECT * FROM images WHERE user_id = $1;", [
			user.id
		]);

		console.log(res.rows);

		return res.rows;
	})
});

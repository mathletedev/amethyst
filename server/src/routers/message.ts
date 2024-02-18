import { v4 as uuid } from "uuid";
import { z } from "zod";

import db from "../lib/db";
import { rizzbot } from "../lib/rizzbot";
import { procedure, router } from "../lib/trpc";
import { getUser } from "../lib/utils";

export const messageRouter = router({
	send: procedure
		.input(
			z.object({
				to: z.string(),
				content: z.string()
			})
		)
		.mutation(async ({ input, ctx }) => {
			const user = await getUser(ctx);

			db.query(
				`
			INSERT INTO
				messages (
					id, sender_id, receiver_id, content
				)
			VALUES (
				$1, $2, $3, $4
			);`,
				[uuid(), user.id, input.to, input.content]
			);

			const result = await rizzbot.generateContent(
				`You are a dating guru, provide a follow-up line for the following: ${input.content}`
			);
			const response = result.response;

			db.query(
				`
			INSERT INTO
				messages (
					id, sender_id, receiver_id, content
				)
			VALUES (
				$1, $2, $3, $4
			);`,
				[uuid(), user.id, input.to, response.text()]
			);
		}),
	getMessages: procedure.input(z.string()).query(async ({ input, ctx }) => {
		const user = await getUser(ctx);

		const res = await db.query(
			`
			SELECT * FROM
				messages
			WHERE
				sender_id = $1 AND receiver_id = $2
			UNION
			SELECT * FROM
				messages
			WHERE
				receiver_id = $1 AND sender_id = $1
			ORDER BY
				created_at DESC;
			`,
			[user.id, input]
		);

		return res.rows;
	})
});

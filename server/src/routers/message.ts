import { v4 as uuid } from "uuid";
import { z } from "zod";

import db from "../lib/db";
import { rizzbot } from "../lib/openai";
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

			const completion = await rizzbot.completions.create({
				messages: [
					{
						role: "system",
						content: "You are a dating guru, provide a follow-up line:"
					},
					{ role: "user", content: input.content }
				],
				model: "gpt-3.5-turbo"
			});

			db.query(
				`
			INSERT INTO
				messages (
					id, sender_id, receiver_id, content
				)
			VALUES (
				$1, $2, $3, $4
			);`,
				[uuid(), user.id, input.to, completion.choices[0].message]
			);
		})
});

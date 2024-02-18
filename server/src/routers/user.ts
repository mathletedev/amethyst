import { TRPCError } from "@trpc/server";
import argon2 from "argon2";
import { v4 as uuid } from "uuid";
import z from "zod";

import { COOKIE_NAME } from "../lib/constants";
import db from "../lib/db";
import { procedure, router } from "../lib/trpc";
import { getUser } from "../lib/utils";

export const userRouter = router({
	me: procedure.query(async ({ ctx }) => {
		return await getUser(ctx);
	}),
	create: procedure
		.input(
			z.object({
				username: z.string(),
				password: z.string()
			})
		)
		.mutation(async ({ input }) => {
			const res = await db.query("SELECT id FROM users WHERE username = $1;", [
				input.username
			]);

			if (res.rowCount)
				throw new TRPCError({
					code: "CONFLICT"
				});

			if (!input.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/))
				throw new TRPCError({
					code: "BAD_REQUEST"
				});

			const hash = await argon2.hash(input.password);

			await db.query(
				"INSERT INTO users (id, username, password) VALUES ($1, $2, $3);",
				[uuid(), input.username, hash]
			);
		}),
	logIn: procedure
		.input(z.object({ username: z.string(), password: z.string() }))
		.query(async ({ input, ctx }) => {
			const res = await db.query(
				"SELECT id, password FROM users WHERE username = $1;",
				[input.username]
			);

			if (!res.rowCount)
				throw new TRPCError({
					code: "NOT_FOUND"
				});

			const user = res.rows[0];

			const verified = await argon2.verify(user.password, input.password);
			if (!verified)
				throw new TRPCError({
					code: "UNAUTHORIZED"
				});

			ctx.req.session.userId = user.id;
		}),
	logOut: procedure.query(async ({ ctx }) => {
		return new Promise(resolve =>
			ctx.req.session.destroy(err => {
				ctx.res.clearCookie(COOKIE_NAME);

				if (err) {
					resolve(false);
					throw new TRPCError({
						code: "INTERNAL_SERVER_ERROR"
					});
				}
				resolve(true);
			})
		);
	})
});

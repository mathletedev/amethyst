import { TRPCError } from "@trpc/server";
import argon2 from "argon2";
import { v4 as uuid } from "uuid";
import z from "zod";

import { COOKIE_NAME } from "../lib/constants";
import db from "../lib/db";
import { procedure, router } from "../lib/trpc";
import { getUser } from "../lib/utils";
import { User } from "../models";

export const userRouter = router({
	me: procedure.query(async ({ ctx }) => {
		return await getUser(ctx);
	}),
	view: procedure.input(z.string()).query(async ({ input }) => {
		const res = await db.query(
			`SELECT id, username, first_name, last_name, bio, gender, birthdate FROM users WHERE id = $1;`,
			[input]
		);

		if (!res.rows)
			throw new TRPCError({
				code: "NOT_FOUND"
			});

		return res.rows[0] as User;
	}),
	create: procedure
		.input(
			z.object({
				username: z.string(),
				password: z.string(),
				first_name: z.string(),
				last_name: z.string(),
				bio: z.string().optional(),
				gender: z.string(),
				target: z.string(),
				birthdate: z.coerce.date()
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
				`
				INSERT INTO
					users (
						id, username, password, first_name, last_name, bio, gender, target, birthdate
					)
				VALUES (
					$1, $2, $3, $4, $5, $6, $7, $8, $9
				);`,
				[
					uuid(),
					input.username,
					hash,
					input.first_name,
					input.last_name,
					input.bio,
					input.gender,
					input.target,
					input.birthdate
				]
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
	}),
	match: procedure.input(z.string()).mutation(async ({ input, ctx }) => {
		const user = await getUser(ctx);

		db.query(
			"INSERT INTO matches (id, first_id, second_id) VALUES ($1, $2, $3);",
			[uuid(), user.id, input]
		);
	}),
	getMatches: procedure.query(async ({ ctx }) => {
		const user = await getUser(ctx);

		const res = await db.query(
			`
			SELECT
				m1.second_id
			FROM
				matches m1
			JOIN
				matches m2 ON m1.first_id = m2.second_id AND m1.second_id = m2.first_id
			WHERE
				m1.first_id = $1;
			`,
			[user.id]
		);

		return res.rows.map(r => r.second_id);
	}),
	random: procedure.query(async ({ ctx }) => {
		const user = await getUser(ctx);

		const res = await db.query(
			"SELECT id FROM users WHERE id != $1 AND ID NOT IN (SELECT second_id FROM matches WHERE first_id = $1) ORDER BY RANDOM() LIMIT 1;",
			[user.id]
		);

		return res.rows[0].id;
	})
});

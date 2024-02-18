import { TRPCError } from "@trpc/server";

import { User } from "../models";
import { ExpressRequest } from "./context";
import db from "./db";

export const getUser = async (ctx: ExpressRequest, fields: string = "id") => {
	if (!ctx.req.session.userId)
		throw new TRPCError({
			code: "UNAUTHORIZED"
		});

	const res = await db.query(`SELECT ${fields} FROM users WHERE id = $1;`, [
		ctx.req.session.userId
	]);

	if (!res.rows)
		throw new TRPCError({
			code: "NOT_FOUND"
		});

	return res.rows[0] as User;
};

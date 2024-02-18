import { inferAsyncReturnType } from "@trpc/server";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { Request } from "express";
import session from "express-session";

type Session = session.Session &
	Partial<session.SessionData> & { userId?: string };

export type ExpressRequest = Omit<CreateExpressContextOptions, "req"> & {
	req: Request & { session: Session };
};

export const createContext = ({ req, res }: ExpressRequest) => ({
	req,
	res
});

export type Context = inferAsyncReturnType<typeof createContext>;

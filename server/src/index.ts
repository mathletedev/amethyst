import * as adapter from "@trpc/server/adapters/express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv-safe";
import express from "express";
import session from "express-session";
import { expressHandler } from "trpc-playground/handlers/express";

import { COOKIE_NAME, ONE_WEEK } from "./lib/constants";
import { createContext } from "./lib/context";
import { logger } from "./lib/logger";
import { appRouter } from "./routers";

(async () => {
	config();

	const app = express();

	app.use(express.json());
	app.use(
		cors({
			origin: process.env.WEB_ORIGIN,
			credentials: true
		})
	);
	app.use(cookieParser());
	app.use(
		session({
			name: COOKIE_NAME,
			secret: process.env.COOKIE_SECRET!,
			cookie: {
				maxAge: ONE_WEEK,
				sameSite: "lax"
			},
			saveUninitialized: false,
			resave: false
		})
	);
	app.use(
		"/api",
		adapter.createExpressMiddleware({
			router: appRouter,
			createContext
		})
	);
	app.use(
		"/playground",
		await expressHandler({
			trpcApiEndpoint: "/api",
			playgroundEndpoint: "/playground",
			router: appRouter,
			renderOptions: {
				cdnUrl: "https://cdn.jsdelivr.net/npm"
			}
		})
	);

	app.listen(parseInt(process.env.PORT ?? "8080"), () => {
		logger.info(`server started at http://localhost:${process.env.PORT}/api`);
		logger.info(
			`playground started at http://localhost:${process.env.PORT}/playground`
		);
	});
})();

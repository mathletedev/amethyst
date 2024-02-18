import * as adapter from "@trpc/server/adapters/express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv-safe";
import express from "express";
import session from "express-session";
import multer from "multer";
import { expressHandler } from "trpc-playground/handlers/express";
import { v4 as uuid } from "uuid";

import { COOKIE_NAME, ONE_WEEK } from "./lib/constants";
import { createContext } from "./lib/context";
import db from "./lib/db";
import { logger } from "./lib/logger";
import { appRouter } from "./routers";

(async () => {
	config();

	const app = express();
	const upload = multer({ dest: "images/" });

	app.use(express.json());
	app.use(express.urlencoded());
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

	app.post("/upload", upload.single("image"), async (req, res) => {
		db.query(
			`
			INSERT INTO
				images (
					id, user_id, url
				)
			VALUES (
				$1, $2, $3
			);`,
			[
				uuid(),
				req.session.userId,
				`${process.env.BASE_URL}/images/${req.file!.filename}`
			]
		);

		res.status(200);
	});
	app.options("/images", cors());
	app.use("/images", express.static("images"));

	app.listen(parseInt(process.env.PORT ?? "8080"), () => {
		logger.info(`server started at http://localhost:${process.env.PORT}/api`);
		logger.info(
			`playground started at http://localhost:${process.env.PORT}/playground`
		);
	});
})();

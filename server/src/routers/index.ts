import { router } from "../lib/trpc";
import { helloRouter } from "./hello";
import { imageRouter } from "./image";
import { userRouter } from "./user";

export const appRouter = router({
	hello: helloRouter,
	image: imageRouter,
	user: userRouter
});

export type AppRouter = typeof appRouter;

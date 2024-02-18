import { router } from "../lib/trpc";
import { helloRouter } from "./hello";
import { userRouter } from "./user";

export const appRouter = router({
	hello: helloRouter,
	user: userRouter
});

export type AppRouter = typeof appRouter;

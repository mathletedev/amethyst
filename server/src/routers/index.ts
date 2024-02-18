import { router } from "../lib/trpc";
import { helloRouter } from "./hello";
import { imageRouter } from "./image";
import { messageRouter } from "./message";
import { userRouter } from "./user";

export const appRouter = router({
	hello: helloRouter,
	image: imageRouter,
	message: messageRouter,
	user: userRouter
});

export type AppRouter = typeof appRouter;

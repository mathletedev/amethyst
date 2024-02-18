import { procedure } from "../lib/trpc";

export const helloRouter = procedure.query(() => {
	return "Hello, world!";
});

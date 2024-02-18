import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "../../../server/src/routers";

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "http://localhost:8080/api",
			fetch: (url, options) =>
				fetch(url, {
					...options,
					credentials: "include"
				})
		})
	]
});

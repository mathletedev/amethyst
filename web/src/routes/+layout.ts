import { trpc } from "$lib/trpc";
import type { User } from "$lib/types";

import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
	let user: User | undefined;

	try {
		user = await trpc.user.me.query();
	} catch (err) {
		user = undefined;
	}

	return {
		user
	};
};

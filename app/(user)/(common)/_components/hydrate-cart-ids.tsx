import loadCartIdsAction from "@/actions/load-cart-ids-action";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

async function HydrateCartIds({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["cart", "ids"],
		queryFn: async () => {
			const data = await loadCartIdsAction();
			if (!data) return { data: [] };

			return { data };
		},
	});

	return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}

export default HydrateCartIds;

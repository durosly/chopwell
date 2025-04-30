import connectMongo from "@/lib/connectMongo";
import CategoryList from "./category-list";
import { handleError } from "@/lib/handleError";
import CustomRefreshButton from "@/app/_components/custom-refresh-button";
import CategoryModel from "@/models/category";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

async function CategoryDisplay() {
	try {
		await connectMongo();
		const queryClient = new QueryClient();

		const query = {};
		const page = 1;

		const categories = await CategoryModel.paginate(query, {
			page,
			sort: "-createdAt",
			populate: {
				path: "_creatorId",
				select: ["_id", "firstname", "lastname"],
			},
			lean: true,
			leanWithId: true, // This option is required to return the _id field as a string
		});

		await queryClient.prefetchQuery({
			queryKey: ["categories", page, query],
			queryFn: () => {
				return JSON.parse(JSON.stringify(categories));
			},
		});

		const dehydratedState = dehydrate(queryClient);

		return (
			<HydrationBoundary state={dehydratedState}>
				<CategoryList />
			</HydrationBoundary>
		);
	} catch (error: unknown) {
		const message = handleError(error);
		return (
			<div className="card bg-error/10">
				<div className="card-body">
					<h2 className="font-bold">An Error occured</h2>
					<p>{message}</p>

					<CustomRefreshButton className="btn btn-sm btn-primary">
						Retry
					</CustomRefreshButton>
				</div>
			</div>
		);
	}
}

export default CategoryDisplay;

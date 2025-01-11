import connectMongo from "@/lib/connectMongo";
import CategoryList from "./category-list";
import { handleError } from "@/lib/handleError";
import CustomRefreshButton from "@/app/_components/custom-refresh-button";
import CategoryModel from "@/models/category";

async function CategoryDisplay() {
	try {
		await connectMongo();

		const data = await CategoryModel.paginate(
			{},
			{
				sort: "-createdAt",
				populate: {
					path: "_creatorId",
					select: ["_id", "firstname", "lastname"],
				},
				lean: true,
				leanWithId: true,
			}
		);

		console.log(data);

		return <CategoryList initialData={data} />;
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

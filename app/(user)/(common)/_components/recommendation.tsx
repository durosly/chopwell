import getFoodItems from "@/actions/get-food-item";
import BrowseList from "./browse-list";

async function Recommendation() {
	const foodItems = await getFoodItems({
		limit: 10,
		sortBy: "average_rating",
		order: "desc",
	});

	if (!foodItems || !foodItems.length) return null;
	return (
		<div>
			<div className="px-5">
				<h2 className="text-xl font-bold">Recommended for you</h2>
			</div>
			{/* // @ts-expect-error: type for items has not been properly defined */}
			<BrowseList items={foodItems} />
		</div>
	);
}

export default Recommendation;

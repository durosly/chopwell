import getFoodItems from "@/actions/get-food-item";
import BrowseList from "./browse-list";

async function Recommendation() {
	const foodItems = await getFoodItems({
		limit: 10,
		sortBy: "average_rating",
		order: "desc",
	});

	if (!foodItems) return null;

	// Handle both array and pagination result
	const items = Array.isArray(foodItems) ? foodItems : foodItems.docs;
	if (!items || !items.length) return null;

	return (
		<div>
			<div className="px-5">
				<h2 className="text-xl font-bold">Recommended for you</h2>
			</div>
			{/* // @ts-expect-error: type for items has not been properly defined */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-5 gap-5 py-3 w-full mb-10">
				<BrowseList items={items} />
			</div>
		</div>
	);
}

export default Recommendation;

import getFoodItems from "@/actions/get-food-item";
import IconStar from "@/icons/star";
import { FoodDocument } from "@/models/food";
import Image from "next/image";
import Link from "next/link";

async function TimebaseSuggestions() {
	const getTimeChoice = () => {
		const currentHour = new Date().getHours();
		if (currentHour >= 5 && currentHour < 11) {
			return "breakfast";
		} else if (currentHour >= 11 && currentHour < 17) {
			return "lunch";
		} else {
			return "dinner";
		}
	};

	const timeChoice = getTimeChoice();
	const foodItems: FoodDocument[] = await getFoodItems({
		limit: 6,
		timeChoice,
		sortBy: "average_rating",
		order: "desc",
	});

	if (!foodItems || !foodItems.length) return null;

	return (
		<div className="mb-10">
			<div className="flex flex-wrap items-center justify-between gap-5 px-5 mb-5">
				<h2 className="text-xl font-bold">Top pick for {timeChoice}</h2>
				<Link
					href={`/browse?time=${timeChoice}`}
					className="btn btn-neutral">
					See all
				</Link>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 px-5 gap-2">
				{Array.isArray(foodItems) &&
					foodItems.map((food: FoodDocument) => (
						<Link
							href={`/product/${food._id}`}
							key={food._id as string}
							className="block h-[250px] relative rounded-box overflow-hidden group">
							<div className="badge badge-xs bg-transparent backdrop-blur text-white border-none absolute top-2 left-1 z-10">
								<IconStar className="w-4 h-4 text-[#FFBB00]" />
								<span>4.5</span>
							</div>
							<Image
								fill
								src={food.image}
								alt={food.name}
								className="object-cover group-hover:scale-105 transition-transform duration-300"
							/>
							<div className="flex items-end absolute inset-0 bg-black/40 p-2">
								<p className="text-xs text-white  group-hover:line-clamp-none line-clamp-2 transition-[line-clamp] duration-300">
									{food.short_desc}
								</p>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}

export default TimebaseSuggestions;

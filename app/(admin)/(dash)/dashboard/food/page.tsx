import Link from "next/link";
import { LuPlus } from "react-icons/lu";

import FoodList from "./_conponents/food-list";

export default function FoodPage() {
	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Food Items</h1>
				<Link href="/dashboard/food/new" className="btn btn-primary">
					<LuPlus className="size-5" />
					Add New Food
				</Link>
			</div>

			<FoodList />
		</div>
	);
}

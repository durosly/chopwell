import Link from "next/link";
import CategorySelection from "./_components/category-selection";
import DiscountPromo from "./_components/discount-promo";
import Recommendation from "./_components/recommendation";
// import FoodTab from "./_components/food-tab";
import SaveBeforeLate from "./_components/save-before-late";
import ImageSlider from "./_components/slider";
import TimebaseSuggestions from "./_components/timebase-suggestion";

export default function Home() {
	return (
		<main>
			<div className="grid grid-cols-4 gap-5">
				<nav>
					<ul aria-label="categories">
						<li>
							<Link href="/browse?category=">Food</Link>
						</li>
					</ul>
				</nav>
				<div className="col-span-2">
					<ImageSlider />
				</div>
				<div>Action</div>
			</div>

			<CategorySelection />

			<TimebaseSuggestions />

			{/* <FoodTab /> */}

			<DiscountPromo />

			<SaveBeforeLate />

			<Recommendation />
		</main>
	);
}

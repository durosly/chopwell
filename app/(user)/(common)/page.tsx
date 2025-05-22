import CategorySelection from "./_components/category-selection";
import DiscountPromo from "./_components/discount-promo";
import Recommendation from "./_components/recommendation";
// import FoodTab from "./_components/food-tab";
import SaveBeforeLate from "./_components/save-before-late";
import ImageSlider from "./_components/slider";
import TimebaseSuggestions from "./_components/timebase-suggestion";
import { LuShoppingBag, LuSoup, LuTag, LuTruck } from "react-icons/lu";
import LandingSidebarWrapper from "./_components/sidebar/wrapper";

export default function Home() {
	return (
		<main className="mx-auto px-4 py-8">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
				<LandingSidebarWrapper />
				<div className="md:col-span-2">
					<ImageSlider />
				</div>
				<div className="max-[800px]:hidden rounded-2xl">
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<div className="flex items-center justify-center size-12 rounded-full border border-black flex-shrink-0">
								<LuTruck className="size-6 flex-shrink-0" />
							</div>
							<div>
								<p className="text-lg font-semibold">
									Fast Delivery
								</p>
								<p className="text-xs font-light">
									Get your food delivered to
									your doorstep in 30 minutes
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<div className="flex items-center justify-center size-12 rounded-full border border-black flex-shrink-0">
								<LuShoppingBag className="size-6 flex-shrink-0" />
							</div>
							<div>
								<p className="text-lg font-semibold">
									Pickup
								</p>
								<p className="text-xs font-light">
									Pick delivery at your
									doorstep
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<div className="flex items-center justify-center size-12 rounded-full border border-black flex-shrink-0">
								<LuSoup className="size-6 flex-shrink-0" />
							</div>
							<div>
								<p className="text-lg font-semibold">
									Wide Variety
								</p>
								<p className="text-xs font-light">
									Different choices of food
									from many cuisines
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<div className="flex items-center justify-center size-12 rounded-full border border-black flex-shrink-0">
								<LuTag className="size-6 flex-shrink-0" />
							</div>
							<div>
								<p className="text-lg font-semibold">
									Affordable Prices
								</p>
								<p className="text-xs font-light">
									Affordable prices for all
									cuisines
								</p>
							</div>
						</div>
					</div>
				</div>
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

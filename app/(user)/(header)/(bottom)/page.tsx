import BrowseList from "./_components/browse-list";
import CategorySelection from "./_components/category-selection";
import DiscountPromo from "./_components/discount-promo";
import FoodTab from "./_components/food-tab";
import SaveBeforeLate from "./_components/save-before-late";
import ImageSlider from "./_components/slider";
import TimebaseSuggestions from "./_components/timebase-suggestion";

export default function Home() {
	return (
		<main>
			<ImageSlider />

			<CategorySelection />

			<TimebaseSuggestions />

			<FoodTab />

			<DiscountPromo />

			<SaveBeforeLate />

			<BrowseList />
		</main>
	);
}

import FilterBy from "./_components/filter-by";
import SortBy from "./_components/sort-by";
import LoadDataWrapper from "./_components/load-data-wrapper";
async function BrowsePage() {
	return (
		<>
			<div className="px-5 mb-5">
				<div className="flex justify-between gap-5 flex-wrap">
					<SortBy />
					<FilterBy />
				</div>
			</div>

			<LoadDataWrapper />
		</>
	);
}

export default BrowsePage;

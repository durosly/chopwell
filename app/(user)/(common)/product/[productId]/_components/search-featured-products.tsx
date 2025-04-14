import IconSearchNormal from "@/icons/search-normal";

function SearchFeaturedProducts() {
	return (
		<form className="px-4 my-5">
			<label className="input flex items-center gap-2 rounded-full">
				<IconSearchNormal className="h-5 w-5 opacity-70" />
				<input
					type="text"
					className="grow"
					placeholder="Search for product"
				/>
			</label>
		</form>
	);
}

export default SearchFeaturedProducts;

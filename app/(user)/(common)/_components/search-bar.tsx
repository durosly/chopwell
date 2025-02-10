import IconSearchNormal from "@/icons/search-normal";

function SearchBar() {
	return (
		<form className="px-4 my-5">
			<label className="input bg-neutral border-[0.5px] border-[#797373] flex items-center gap-2 rounded-full">
				<IconSearchNormal className="h-5 w-5 opacity-70" />
				<input type="text" className="grow" placeholder="Search for product" />
			</label>
		</form>
	);
}

export default SearchBar;

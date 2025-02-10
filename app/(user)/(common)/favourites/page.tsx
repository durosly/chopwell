import BottomNav from "../_components/bottom-nav";
import BrowseList from "../_components/browse-list";
// import NoFavourites from "./_components/no-favourites";

function UserFavouritesPage() {
	return (
		<>
			{/* <div className="p-2">
				<NoFavourites />
			</div> */}

			<div className="px-5 pt-2">
				<h2 className="text-xl font-bold">Favourites</h2>
			</div>
			<BrowseList />

			<BottomNav />
		</>
	);
}

export default UserFavouritesPage;

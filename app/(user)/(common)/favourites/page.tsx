import BottomNav from "../_components/bottom-nav";
import LoadData from "./_components/load-data";
// import BrowseList from "../_components/browse-list";
// import NoFavourites from "./_components/no-favourites";

async function UserFavouritesPage() {
	return (
		<>
			{/* <div className="p-2">
				<NoFavourites />
			</div> */}

			<div className="px-5 pt-2">
				<h2 className="text-xl font-bold">Favourites</h2>
			</div>
			{/* <BrowseList /> */}

			<LoadData />

			<BottomNav />
		</>
	);
}

export default UserFavouritesPage;

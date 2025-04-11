import LoadData from "./_components/load-data";

async function UserFavouritesPage() {
	return (
		<>
			<div className="px-5 pt-2">
				<h2 className="text-xl font-bold">Favourites</h2>
			</div>

			<LoadData />
		</>
	);
}

export default UserFavouritesPage;

import Image from "next/image";
import favImg from "@/public/images/favourite-illustration.png";

function NoFavourites() {
	return (
		<div className="pt-20 min-h-screen">
			<div className="text-center">
				<h2 className="text-xl font-bold mb-2">No Favourites Added Yet</h2>
				<p>
					Tap the Heart icon on any of your favorites in other to add
					it to your favorites and it will show here.
				</p>
			</div>

			<div className="relative w-full h-[200px]">
				<Image
					fill
					src={favImg}
					placeholder="blur"
					alt=""
					className="object-contain"
				/>
			</div>
		</div>
	);
}

export default NoFavourites;

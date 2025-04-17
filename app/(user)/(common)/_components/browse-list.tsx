import IconHeart from "@/icons/heart";
import IconStar from "@/icons/star";
import { FoodDocument } from "@/models/food";
import Image from "next/image";
import { LuPlus } from "react-icons/lu";
import CartBtn from "./cart-btn";
import FavBtn from "./fav-btn";
import LinkWithCartAndFav from "./link-with-cart-and-fav";
import LoadFavourites from "./load-favourites";
import commaNumber from "@/utils/comma-number";

// type PropType = {
// 	items: FoodDocument[];
// 	type: "grid" | "list";
// };

function BrowseList({ items }: { items: FoodDocument[] }) {
	return (
		<>
			<LoadFavourites />

			{items.map((item) => (
				<LinkWithCartAndFav
					key={item._id as string}
					href={`/product/${item.slug}`}
					className="card bg-base-100 border border-base-300 rounded-box overflow-hidden group hover:shadow-lg transition-all duration-300">
					<div className="relative h-[200px] overflow-hidden">
						<Image
							src={item.image}
							alt={item.name}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
							sizes="(min-width: 1540px) 323px, (min-width: 1280px) calc(12.5vw + 133px), (min-width: 780px) calc(33.33vw - 29px), (min-width: 640px) calc(50vw - 32px), calc(100vw - 42px)"
						/>
						<div className="absolute top-0 w-full flex justify-between p-4">
							<div className="flex gap-2">
								<span className="badge badge-primary badge-sm">
									Support local
								</span>
							</div>
							<FavBtn
								foodId={item._id as string}
								className="btn btn-sm btn-square border-none bg-base-100/80 backdrop-blur-sm text-secondary rounded-full p-1 fill-transparent hover:bg-base-100/90"
								activeClassName="bg-transparent fill-primary">
								<IconHeart className="pointer-events-none fill-inherit" />
							</FavBtn>
						</div>
					</div>
					<div className="card-body p-4">
						<div className="space-y-2">
							<h3 className="card-title text-base font-bold line-clamp-1">
								{item.name}
							</h3>
							<div
								className="tooltip tooltip-primary text-left"
								data-tip={item.short_desc}>
								<p className="text-xs text-base-content/70 line-clamp-1">
									{item.short_desc}
								</p>
							</div>
							<div className="flex items-center justify-between">
								<p className="font-bold text-lg">
									{commaNumber(item.price)}
								</p>
								<div className="flex gap-2 items-center text-xs font-bold">
									<div className="flex gap-1 items-center">
										<IconStar className="w-4 h-4 text-[#FFBB00]" />
										<span>
											{
												item.average_rating
											}
										</span>
									</div>
									<p className="text-base-content/70">
										{Math.round(
											item.preparation_time -
												item.preparation_time *
													0.3
										)}
										-
										{
											item.preparation_time
										}{" "}
										min
									</p>
								</div>
							</div>
						</div>
						<div className="card-actions mt-4">
							<CartBtn
								foodId={item._id as string}
								className="btn btn-sm btn-block btn-primary disabled:bg-gray-100 disabled:cursor-not-allowed">
								<LuPlus />
								Add to cart
							</CartBtn>
						</div>
					</div>
				</LinkWithCartAndFav>
			))}
		</>
	);
}

export default BrowseList;

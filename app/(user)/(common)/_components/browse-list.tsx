import IconHeart from "@/icons/heart";
import IconStar from "@/icons/star";
import { FoodDocument } from "@/models/food";
import Image from "next/image";
import { LuPlus } from "react-icons/lu";
import CartBtn from "./cart-btn";
import FavBtn from "./fav-btn";
import LinkWithCartAndFav from "./link-with-cart-and-fav";
import LoadFavourites from "./load-favourites";

// type PropType = {
// 	items: FoodDocument[];
// 	type: "grid" | "list";
// };

function BrowseList({ items }: { items: FoodDocument[] }) {
	return (
		<>
			<LoadFavourites />
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-5 gap-5 py-3 w-full mb-10">
				{items.map((item) => (
					<LinkWithCartAndFav
						key={item._id as string}
						href={`/product/${item._id}`}
						className="border-[0.5px] bg-base-100 border-base-300 flex-col rounded-box overflow-hidden group">
						<div className="relative h-[200px] overflow-hidden">
							<Image
								src={item.image}
								alt={item.name}
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300"
							/>
							<div className="absolute top-0 w-full flex justify-between p-4">
								<div></div>
								<FavBtn
									foodId={item._id as string}
									className="btn btn-sm btn-square border-none bg-[#797373] text-secondary rounded-full p-1 fill-transparent"
									activeClassName="bg-transparent fill-primary">
									<IconHeart className="pointer-events-none fill-inherit" />
								</FavBtn>
							</div>
						</div>
						<div className="p-2">
							<div className="space-y-2 mb-2">
								<h3 className="font-bold">
									{item.name}
								</h3>
								<div
									className="tooltip tooltip-primary text-left"
									data-tip={item.short_desc}>
									<p className="text-xs line-clamp-1">
										{item.short_desc}
									</p>
								</div>
								<p className="font-bold whitespace-nowrap">
									NG {item.price}
								</p>
								<div className="flex gap-2 justify-between items-center text-xs font-bold">
									<div className="flex gap-1 items-center">
										<IconStar className="w-4 h-4 text-[#FFBB00]" />
										<span>
											{
												item.average_rating
											}
										</span>
									</div>
									<p>
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
							<CartBtn
								foodId={item._id as string}
								className="btn btn-sm btn-block btn-primary disabled:bg-gray-100 disabled:cursor-not-allowed">
								<LuPlus />
								Add to cart
							</CartBtn>
						</div>
					</LinkWithCartAndFav>
				))}
			</div>
		</>
	);
}

export default BrowseList;

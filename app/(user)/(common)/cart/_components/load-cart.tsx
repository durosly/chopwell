"use client";
import { getCart } from "@/api";
import { handleError } from "@/lib/handleError";
import commaNumber from "@/utils/comma-number";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { LuBadgeAlert } from "react-icons/lu";
import dynamic from "next/dynamic";
const LoadingCartAnimation = dynamic(() => import("./loading-cart"), {
	ssr: false,
	loading: () => <div className="animate-pulse">...</div>,
});
import AddNewCartGroupButton from "./add-new-cart-group-btn";
import GroupDeleteBtn from "./group-delete-btn";
import GroupTitle from "./group-title";
import IncreaseItemQuantity from "./increase-item-quantity";
import ReduceItemQuantity from "./reduce-item-quantity";
import RemoveCartItemBtn from "./remove-cart-item-btn";
import DuplicateCartItemButton from "./duplicate-cart-item-button";
import MoveCartItemButton from "./move-cart-item-button";
function LoaCart() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["cart-full-data"],
		queryFn: () => getCart(),
		refetchOnWindowFocus: false,
	});

	if (isLoading) {
		return (
			<div className="flex flex-col items-center">
				<LoadingCartAnimation />
				<p>Loading...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex flex-col items-center">
				<LuBadgeAlert className="w-20 h-20" />
				<p>{handleError(error)}</p>
			</div>
		);
	}

	return (
		<>
			{
				// @ts-expect-error: specify type of group
				data.data.map((group, i: number) => (
					<Fragment key={group._id}>
						<div className="pl-5 max-md:pr-5 max-lg:pr-10 md:pl-10">
							<hr className="mb-5" />
						</div>
						<div className="px-5 md:px-10 mb-10 last:mb-0">
							<div>
								<div className="mb-5">
									<div className="flex justify-between items-center gap-2">
										<div className="flex items-center gap-2">
											<h3 className="text-xl font-bold">
												{
													group.title
												}
											</h3>
											<GroupTitle
												groupId={
													group._id
												}
											/>
											<GroupDeleteBtn
												groupId={
													group._id
												}
												title={
													group.title
												}
											/>
										</div>
										{i === 0 && (
											<AddNewCartGroupButton />
										)}
									</div>
									<p className="text-xs">
										Total:{" "}
										{commaNumber(
											group.total
										)}
										<span className="text-gray-500">
											(
											{Math.round(
												group.percentage
											)}
											%)
										</span>
									</p>
								</div>
								<ul className="grid grid-cols-1 gap-5">
									{group.items.map(
										// @ts-expect-error: specify type of cartItem
										(cartItem) => (
											<li
												key={
													cartItem._id
												}
												className="border-b pb-5 last:border-b-0 last:pb-0">
												<Link
													href={`/product/${cartItem.slug}`}
													className="flex gap-5 items-start mb-2">
													<div className="relative size-[70px] flex-none aspect-square rounded-md overflow-hidden">
														<Image
															src={
																cartItem.image
															}
															alt={
																cartItem.name
															}
															fill
															className="object-cover"
														/>
													</div>
													<div className="flex justify-between flex-1 mb-2">
														<div>
															<h3 className="text-xl font-bold">
																{
																	cartItem.name
																}
															</h3>
															<div className="sm:hidden">
																<p className="font-bold text-xl">
																	{commaNumber(
																		cartItem.price
																	)}
																</p>
																{!!cartItem.promo && (
																	<div className="flex items-center gap-1">
																		<p className="line-through text-gray-400">
																			NG
																			1,300
																		</p>
																		<span className="badge badge-accent">
																			-40%
																		</span>
																	</div>
																)}
															</div>
															<ul className="text-[10px] text-[#3A3939]">
																<li>
																	{cartItem.available
																		? "In"
																		: "Out of"}
																	stock
																</li>
																<li>
																	food
																</li>
															</ul>
														</div>
														{!!cartItem.promo && (
															<div className="hidden sm:flex items-center gap-1">
																<p className="font-bold text-xl">
																	NG
																	2,000
																</p>
																<div className="flex items-center gap-1">
																	<p className="line-through text-gray-400">
																		NG
																		1,300
																	</p>
																	<span className="badge badge-accent">
																		-40%
																	</span>
																</div>
															</div>
														)}
														<div className="max-sm:hidden">
															<p className="font-bold text-xl">
																{commaNumber(
																	cartItem.price
																)}
															</p>

															{!!cartItem.promo && (
																<div className="flex items-center gap-1">
																	<p className="line-through text-gray-400">
																		NG
																		1,300
																	</p>
																	<span className="badge badge-accent">
																		-40%
																	</span>
																</div>
															)}
														</div>
													</div>
												</Link>

												<div className="flex-1">
													<div className="flex justify-between items-center gap-5">
														<div className="flex items-center gap-5">
															<RemoveCartItemBtn
																cartItemId={
																	cartItem._id
																}
															/>
															<div>
																{/* move cart item to another group */}
																<MoveCartItemButton
																	group={data.data.map(
																		(group: {
																			_id: string;
																			title: string;
																		}) => ({
																			_id: group._id,
																			title: group.title,
																		})
																	)}
																	cartItemId={
																		cartItem._id
																	}
																/>
																{/* copy cart item to another group */}
																<DuplicateCartItemButton
																	group={data.data.map(
																		(group: {
																			_id: string;
																			title: string;
																		}) => ({
																			_id: group._id,
																			title: group.title,
																		})
																	)}
																	cartItemId={
																		cartItem._id
																	}
																/>
															</div>
														</div>
														<div className="flex items-center gap-5">
															<ReduceItemQuantity
																itemId={
																	cartItem._id
																}
																quantity={
																	cartItem.quantity
																}
															/>
															<span className="">
																{
																	cartItem.quantity
																}
															</span>
															<IncreaseItemQuantity
																itemId={
																	cartItem._id
																}
																quantity={
																	cartItem.quantity
																}
															/>
														</div>
													</div>
												</div>
											</li>
										)
									)}
								</ul>
							</div>
						</div>
					</Fragment>
				))
			}
		</>
	);
}

export default LoaCart;

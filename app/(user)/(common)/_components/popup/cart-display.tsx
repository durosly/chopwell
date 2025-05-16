"use client";

import { useGetUserCart } from "@/hooks/useCart";
import { handleError } from "@/lib/handleError";
import { CartItem } from "@/types";
import commaNumber from "@/utils/comma-number";
import { LuDiff, LuEllipsisVertical, LuTag } from "react-icons/lu";
import AddNewCartGroupButton from "./add-new-cart-group-btn";
import EditGroupTitleBtn from "./edit-group-title-btn";
import GroupDeleteBtn from "./group-delete-btn";
import RemoveCartItemBtn from "./remove-cart-item-btn";
import MoveCartItemButton from "./move-cart-item-button";
import DuplicateCartItemButton from "./duplicate-cart-item-button";
import pluralize from "pluralize";
import UpdateCartItemQuantity from "./update-cart-item-quantity";

interface CartGroupData {
	_id: string;
	title: string;
	items: CartItem[];
	total: number;
	percentage: number;
}

function CartDisplay() {
	const { data, isPending, isError, error, isFetching } = useGetUserCart();

	if (isPending) {
		return (
			<div className="card">
				<div className="card-body">
					<h2 className="card-title">Loading</h2>
					<span className="loading loading-spinner"></span>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="card">
				<div className="card-body">
					<h2 className="card-title">Error</h2>
					<p>{handleError(error)}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-h-[300px] overflow-y-auto mb-2">
			<ul className="space-y-2">
				{data.data.map((group: CartGroupData, i: number) => (
					<li key={group._id}>
						<div className="bg-base-200 rounded-md px-5 py-2 mb-2">
							<div className="flex gap-2 items-center">
								<span className="text-sm sm:text-lg font-bold">
									{group.title}
								</span>

								<div>
									<EditGroupTitleBtn
										groupId={group._id}
										title={group.title}
									/>
									<GroupDeleteBtn
										groupId={group._id}
										title={group.title}
									/>
									{i === 0 && (
										<AddNewCartGroupButton />
									)}
								</div>
							</div>
							<p className="text-xs">
								{commaNumber(group.total)}
								<span className="text-gray-500">
									(
									{Math.round(
										group.percentage
									)}
									%)
								</span>
							</p>
						</div>
						{group.items.length > 0 ? (
							<ul>
								{group.items.map(
									(item: CartItem) => (
										<li
											key={
												item._id
											}
											className="not-last:border-b not-last:pb-2">
											<div className="flex items-center gap-5">
												<RemoveCartItemBtn
													cartItemId={
														item._id
													}
												/>
												<div>
													<p className="text-sm font-bold">
														{
															item.name
														}
													</p>
													<h2 className="flex items-center gap-1">
														<LuTag className="size-3 sm:size-4" />
														<span className="text-xs sm:text-sm">
															{
																item.category
															}
														</span>
													</h2>

													<p className="text-xs">
														{commaNumber(
															item.price
														)}{" "}
														X{" "}
														{
															item.quantity
														}
													</p>
												</div>
												<div className="ml-auto self-start">
													<p className="text-sm font-bold">
														{commaNumber(
															item.price *
																item.quantity
														)}
													</p>
													<div className="flex items-center gap-2">
														<p className="text-xs">
															{
																item.quantity
															}{" "}
															{pluralize(
																item.unit,
																item.quantity
															)}
														</p>
														<button
															popoverTarget={`quantity-${item._id}`}
															style={
																{
																	anchorName: `--anchor-quantity-${item._id}`,
																} as React.CSSProperties
															}
															className="btn btn-xs btn-square btn-soft">
															<LuDiff className="size-4" />
														</button>
														<div
															className="dropdown dropdown-end w-52 p-5 rounded-box border bg-base-100 shadow-sm"
															popover="auto"
															id={`quantity-${item._id}`}
															style={
																{
																	positionAnchor: `--anchor-quantity-${item._id}`,
																} as React.CSSProperties
															}>
															<div>
																<p className="text-xs font-bold line-clamp-1">
																	{
																		item.name
																	}
																</p>

																<UpdateCartItemQuantity
																	itemId={
																		item._id
																	}
																	currentQuantity={
																		item.quantity
																	}
																/>
															</div>
														</div>
													</div>
												</div>
												<button
													popoverTarget={`action-${item._id}`}
													style={
														{
															anchorName: `--anchor-action-${item._id}`,
														} as React.CSSProperties
													}
													className="btn btn-xs btn-ghost">
													<LuEllipsisVertical className="size-4" />
												</button>
												<div
													className="dropdown dropdown-end w-52 p-5 rounded-box border bg-base-100 shadow-sm"
													popover="auto"
													id={`action-${item._id}`}
													style={
														{
															positionAnchor: `--anchor-action-${item._id}`,
														} as React.CSSProperties
													}>
													<div className="flex flex-col gap-2">
														<p className="text-xs font-bold line-clamp-1">
															{
																item.name
															}
														</p>
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
																item._id
															}
														/>

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
																item._id
															}
														/>
													</div>
												</div>
											</div>
										</li>
									)
								)}
							</ul>
						) : (
							<p className="text-center text-sm text-gray-500 italic">
								No items in group
							</p>
						)}
					</li>
				))}
			</ul>
			{isFetching && (
				<div className="flex items-center gap-2">
					<span className="text-sm">Updating cart</span>
					<span className="loading loading-spinner"></span>
				</div>
			)}
		</div>
	);
}

export default CartDisplay;

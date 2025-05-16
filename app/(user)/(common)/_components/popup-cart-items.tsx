"use client";

import { useAddItemToCartFromOrderCode } from "@/hooks/useCart";
import IconTrash from "@/icons/trash";
import type { PopupCartItemsProps, PopupItems } from "@/types";
import commaNumber from "@/utils/comma-number";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function PopupCartItems({ data }: PopupCartItemsProps) {
	const { mutate, isPending } = useAddItemToCartFromOrderCode();

	const [items, setItems] = useState<PopupItems>(data.items);

	function handleRemoveItem(id: string, label: string) {
		if (!items[label]) return;

		const newListItems = {
			...items,
			[label]: items[label].filter((item) => item.id !== id),
		};
		setItems(newListItems);
	}

	return (
		<div className="max-h-[500px] overflow-y-auto">
			{Object.keys(items).map((label) => (
				<div key={label} className="mt-2">
					<h3 className="text-lg font-bold mb-2">{label}</h3>

					<ul className="space-y-4 sm:space-y-2">
						{items[label].map((item) => (
							<li key={item.id}>
								<div className="flex items-center gap-2 ">
									<button
										onClick={() =>
											handleRemoveItem(
												item.id,
												label
											)
										}
										className="btn btn-xs btn-square btn-ghost">
										<IconTrash className="size-4" />
									</button>
									<Link
										href={`/product/${item.productId}`}
										className="flex  max-sm:flex-col sm:items-center justify-between gap-2">
										<div className="flex max-sm:flex-col sm:items-center gap-2">
											<div className="relative size-8 rounded-md overflow-hidden">
												<Image
													src={
														item.image
													}
													alt={
														item.name
													}
													fill
													className="object-cover"
												/>
											</div>
											<p className="max-sm:text-sm">
												{
													item.name
												}
											</p>
										</div>
										<span className="text-sm text-gray-500 max-sm:text-xs">
											{
												item.quantity
											}{" "}
											X{" "}
											{commaNumber(
												item.price
											)}{" "}
											={" "}
											{commaNumber(
												item.quantity *
													item.price
											)}
										</span>
									</Link>
								</div>
							</li>
						))}
					</ul>
				</div>
			))}

			<button
				disabled={isPending}
				onClick={() => mutate(items)}
				className="btn btn-block btn-primary mt-4">
				Add to cart
			</button>
		</div>
	);
}

export default PopupCartItems;

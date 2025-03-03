"use client";
import IconTrash from "@/icons/trash";
import { handleError } from "@/lib/handleError";
import commaNumber from "@/utils/comma-number";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { LuBadgeAlert, LuMinus, LuPencil, LuPlus } from "react-icons/lu";
import { getCart } from "@/api";
import LoadingCartAnimation from "./loading-cart";

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
		<div className="px-5 md:px-10">
			{data.data.map((group, i: number) => (
				<div key={group._id}>
					<div className="mb-5">
						<div className="flex justify-between items-center gap-2">
							<div className="flex items-center gap-2">
								<h3 className="text-xl font-bold">
									{group.title}
								</h3>
								<button>
									<LuPencil />
								</button>
							</div>
							{i === 0 && (
								<button className="btn btn-primary btn-sm">
									<LuPlus />
									<span className="max-sm:hidden">
										Add new group
									</span>
								</button>
							)}
						</div>
						<p className="text-xs">
							Total: {commaNumber(group.total)}
							<span className="text-gray-500">
								({group.percentage}%)
							</span>
						</p>
					</div>
					<ul className="grid grid-cols-1 gap-5">
						{group.items.map((cartItem, i: number) => (
							<li
								key={cartItem._id}
								className="border-b pb-5 last:border-b-0 last:pb-0">
								<Link
									href={`/product/${cartItem._id}`}
									className="flex gap-5 items-start ">
									<div className="relative w-[70px] flex-none aspect-square rounded-md overflow-hidden">
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
													In
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
												NG
												2,000
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
									{/* <form action="">
                            <label className="form-control">
                                <textarea
                                    className="textarea textarea-sm textarea-bordered border-[#C2C2C2] h-10"
                                    placeholder="Add special request here..."></textarea>
                            </label>
                        </form> */}

									<div className="flex justify-between items-center gap-5">
										<button className="btn btn-sm btn-accent">
											<IconTrash className="w-5 h-5" />{" "}
											Remove
										</button>
										<div className="">
											<button
												disabled
												className="btn btn-square btn-sm">
												<LuMinus />
											</button>
											<span className="btn btn-ghost btn-square">
												1
											</span>
											<button className="btn btn-square btn-sm">
												<LuPlus />
											</button>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

export default LoaCart;

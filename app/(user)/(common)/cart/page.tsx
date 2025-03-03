import IconArrowLeft from "@/icons/arrow-left";
import IconCardAdd from "@/icons/card-add";
import IconTrash from "@/icons/trash";
import Link from "next/link";
import { LuBadgeAlert, LuBadgeInfo } from "react-icons/lu";
import CartSummaryModal from "./_components/cart-summary-modal";
import CartTitleCount from "./_components/cart-title-count";
import LoaCart from "./_components/load-cart";
import ShowSummaryModalButton from "./_components/show-summary-modal-btn";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import getCartDataAction from "@/actions/get-cart-action";

async function CartPage() {
	const cart = await getCartDataAction();

	if (cart.status === false) {
		return (
			<div className="flex flex-col items-center justify-center min-h-14 h-[40vh]">
				<LuBadgeAlert className="w-20 h-20" />
				<p>{cart.message}</p>
			</div>
		);
	}

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["cart-full-data"],
		queryFn: () => cart.data,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{/* px-5 md:px-10 */}
			<div className="">
				<div className="flex">
					<div className="py-2 flex-1">
						<div className="flex flex-wrap items-center justify-between gap-5 mb-5 py-4 px-5 md:px-10">
							<CartTitleCount />
							<button className="btn btn-xs btn-square border-none">
								<IconTrash />
							</button>
						</div>
						<div className="pl-5 md:pl-10">
							<hr className="mb-5" />
						</div>
						<LoaCart />
					</div>
					<div className="max-lg:hidden w-80 pt-3 border-l">
						<div className="sticky top-28 ">
							<div className="border-y px-5 py-5">
								<h2 className="text-xl font-semibold uppercase mb-4">
									Cart Summary
								</h2>
								<div className="flex justify-between gap-2">
									<p>Subtotal</p>
									<p className="text-xl font-bold">
										N 2,500
									</p>
								</div>
								<p className="text-xs flex item-center gap-1 text-gray-500 mb-4">
									<LuBadgeInfo /> Delivery fee
									not included yet
								</p>
								<button className="btn btn-primary btn-block">
									Checkout (N2,300)
								</button>
							</div>
							<form action="" className="p-5 border-b">
								<div className="form-control mb-2">
									<label
										className="label"
										htmlFor="promo-code">
										<span className="label-text-alt">
											Promo Code
										</span>
									</label>
									<input
										type="text"
										name="promo-code"
										id="promo-code"
										className="input input-bordered"
									/>
								</div>
								<button className="btn btn-primary">
									Apply
								</button>
							</form>
							<div className="border-b p-5">
								<h2 className="text-xl font-semibold">
									Returns
								</h2>
								<p className="text-xs text-gray-500">
									Learn more about our return
									policy{" "}
									<Link
										className="link"
										href="/return-policy">
										here
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="p-3 my-3 mb-5 border-t bg-base-100 lg:hidden sticky bottom-0">
				{/* <h2>Cart Summary</h2>

				<p className="text-sm mb-1">Subtotal</p> */}
				<div className="bg-primary text-neutral p-2 rounded-full flex justify-between font-bold">
					<div className="space-x-2">
						<ShowSummaryModalButton>
							<span className="badge badge-secondary text-primary rounded-full aspect-square">
								1
							</span>
							<span>N 2,500</span>
						</ShowSummaryModalButton>
						<CartSummaryModal>
							<dialog
								className="modal modal-bottom"
								id="cart-summary-modal">
								<div className="modal-box">
									<form method="dialog">
										<button className="btn btn-sm btn-square border-none bg-secondary/80 text-[#292D32] rounded-[8px] p-1 absolute right-2 top-2">
											✕
										</button>
									</form>
									<div>
										<h3 className="font-bold text-[28px] mt-5 mb-8">
											Remove this
											delivery
										</h3>
										<button className="btn btn-primary btn-block rounded-full mb-2">
											Yes, delete
										</button>

										<form method="dialog">
											<button className="btn btn-secondary rounded-full text-dark btn-block">
												Cancel
											</button>
										</form>
									</div>
								</div>
							</dialog>
						</CartSummaryModal>
					</div>

					<Link className="flex gap-2 items-center" href="/cart">
						Checkout{" "}
						<IconArrowLeft className="w-5 h-5 rotate-180" />
					</Link>
				</div>
				{/* <p className="text-xs flex item-center gap-1">
					<LuBadgeInfo /> Delivery fee not included yet
				</p> */}
			</div>

			{/* <dialog className="modal modal-open">
				<div className="modal-box">
					<form method="dialog">
					
						<button className="btn btn-sm btn-square border-none bg-secondary/80 text-[#292D32] rounded-[8px] p-1 absolute right-2 top-2">
							✕
						</button>
					</form>
					<div>
						<h3 className="font-bold text-[28px] mt-5 mb-8">Remove this delivery</h3>
						<button className="btn btn-primary btn-block rounded-full mb-2">Yes, delete</button>

						<form method="dialog">
							
							<button className="btn btn-secondary rounded-full text-dark btn-block">Cancel</button>
						</form>
					</div>
				</div>
			</dialog> */}
			<dialog className="modal modal-bottom">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-square border-none bg-secondary/80 text-[#292D32] rounded-[8px] p-1 absolute right-2 top-2">
							✕
						</button>
					</form>
					{/* <div>
						<h3 className="font-bold text-[28px] mb-8">Pay with</h3>

						<form action="">
							<div className="form-control mb-5">
								<label className="label cursor-pointer border-y first:border-t-0 last:border-b-0">
									<span className="label-text flex items-center gap-1">
										<IconUser className="w-5 h-5 " />
										<span>Chopwell credit</span>
									</span>
									<input type="radio" name="radio-10" className="radio checked:bg-primary" />
								</label>
								<label className="label cursor-pointer border-y first:border-t-0 last:border-b-0">
									<span className="label-text flex items-center gap-1">
										<IconCardAdd className="w-5 h-5 " />
										<span>Debit Card</span>
									</span>
									<input type="radio" name="radio-10" className="radio checked:bg-primary" />
								</label>
								<label className="label cursor-pointer border-y first:border-t-0 last:border-b-0">
									<span className="label-text flex items-center gap-1">
										<IconMoney className="w-5 h-5 " />
										<span>On Delivery</span>
									</span>
									<input type="radio" name="radio-10" className="radio checked:bg-primary" />
								</label>
								<label className="label cursor-pointer border-y first:border-t-0 last:border-b-0">
									<span className="label-text flex items-center gap-1">
										<IconApple className="w-5 h-5 " />
										<span>Apple Pay</span>
									</span>
									<input type="radio" name="radio-10" className="radio checked:bg-primary" defaultChecked />
								</label>
							</div>

							<button className="btn btn-neutral btn-block border-none bg-neutral">Next</button>
						</form>
					</div> */}

					<div>
						<h3 className="font-bold text-[28px] mb-8">
							Payment method
						</h3>
						<div className="mb-5">
							<div className="flex items-center gap-2 bg-neutral p-2 rounded-md mb-2">
								<IconCardAdd className="w-5 h-5" />
								<span>***0945</span>

								<Link
									className="btn btn-sm btn-ghost ml-auto"
									href="/">
									<IconArrowLeft className="w-5 h-5 rotate-180" />
								</Link>
							</div>
							<Link
								href="/profile/add-card"
								className="flex flex-col items-center bg-neutral p-2 rounded-md">
								<span className="font-bold">
									+ Add new card
								</span>
								<span className="text-[12px] text-[#797373]">
									use any type of debit card
								</span>
							</Link>
						</div>

						<div className="flex items-center justify-between gap-5">
							<div className="flex flex-col">
								<span className="font-bold">
									NG 2,500
								</span>
								<span className="text-[12px]">
									Sub total
								</span>
							</div>

							<button className="btn btn-primary rounded-3xl">
								Place Order
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</HydrationBoundary>
	);
}

export default CartPage;

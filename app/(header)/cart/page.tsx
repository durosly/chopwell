import IconArrowLeft from "@/icons/arrow-left";
import IconTrash from "@/icons/trash";
import Image from "next/image";
import Link from "next/link";

function CartPage() {
	return (
		<>
			<div className="p-2">
				<div className="flex flex-wrap items-center justify-between gap-5 px-5 mb-5 py-4">
					<h2 className="text-xl font-bold">Today, within 20 min</h2>
					<button className="btn btn-xs btn-square border-none">
						<IconTrash />
					</button>
				</div>

				<ul className="grid grid-cols-1 gap-5">
					{Array(7)
						.fill(3)
						.map((_, i) => (
							<li key={i} className="flex gap-5 items-start">
								<div className="relative w-[117px] flex-none aspect-square rounded-3xl overflow-hidden">
									<Image
										src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
										alt="Burger"
										fill
										className="object-cover"
									/>
								</div>

								<div className="space-y-2">
									<h3 className="text-xl font-bold">Hot Jollof Rice</h3>
									<ul className="text-[10px] text-[#3A3939]">
										<li>Extra salad</li>
										<li>Extra salad</li>
									</ul>
									<form action="">
										<label className="form-control">
											<textarea
												className="textarea textarea-sm textarea-bordered border-[#C2C2C2] h-10"
												placeholder="Add special request here..."></textarea>
										</label>
									</form>

									<div className="flex justify-between gap-5">
										<span className="font-bold ">NG 2,000</span>
										<button className="btn btn-xs btn-accent w-[117px]">Add</button>
										{/* <div className="flex bg-accent h-6 rounded-xl">
                                                <button className="h-full  flex items-center px-2 text-2xl">&#45;</button>
                                                <span className="flex items-center justify-center flex-1">1</span>
                                                <button className="h-full  flex items-center px-2 text-2xl">&#43;</button>
                                            </div> */}
									</div>
								</div>
							</li>
						))}
				</ul>
			</div>

			<div className="p-3 my-3 shadow-2xl mb-5 border-t bg-base-100 sticky bottom-0">
				<div className="flex items-center justify-between gap-5 my-5">
					<p className="text-xs">Delivery fee</p>
					<p className="font-bold">NG 0</p>
				</div>
				<div className="bg-primary text-neutral p-2 rounded-full flex justify-between  font-bold">
					<div className="space-x-2">
						<span className="badge badge-secondary text-primary rounded-full aspect-square">1</span>
						<span>N 2,500</span>
					</div>

					<Link className="flex gap-2 items-center" href="/cart">
						Checkout <IconArrowLeft className="w-5 h-5 rotate-180" />
					</Link>
				</div>
			</div>

			<dialog className="modal modal-open">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-square border-none bg-secondary/80 text-[#292D32] rounded-[8px] p-1 absolute right-2 top-2">
							✕
						</button>
					</form>
					<div>
						<h3 className="font-bold text-[28px] mt-5 mb-8">Remove this delivery</h3>
						<button className="btn btn-primary btn-block rounded-full mb-2">Yes, delete</button>

						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn btn-secondary rounded-full text-dark btn-block">Cancel</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}

export default CartPage;

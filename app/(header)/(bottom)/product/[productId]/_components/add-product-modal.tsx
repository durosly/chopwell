import Image from "next/image";

function AddProductModal() {
	return (
		<dialog id="my_modal_1" className="modal modal-open modal-bottom">
			<div className="modal-box p-0">
				<div className="">
					<div className="relative h-[250px] w-full rounded-2xl overflow-hidden">
						<Image src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Burger" fill className="object-cover" />
					</div>
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-square border-none bg-secondary/80 text-[#292D32] rounded-[8px] p-1 absolute right-2 top-2">
							✕
						</button>
					</form>
				</div>
				<div className="p-5">
					<div className="mb-3">
						<h2 className="text-xl font-bold">Hot Jollof Rice</h2>
						<p className="text-xs text-[#3A3939]">
							Medium burger French fries Medium burger French fries Medium burger French fries Medium burger French fries
						</p>
					</div>
					<form action="">
						<label className="form-control mb-10">
							<div className="label justify-start gap-1">
								<span className="label-text font-bold">Special Request</span>
								<span className="label-text-alt">optional</span>
							</div>
							<textarea className="textarea bg-neutral h-20" placeholder="Write any instructions here..."></textarea>
						</label>

						<div className="flex gap-5 justify-between">
							<div className="flex-1 flex bg-accent rounded-xl">
								<button type="button" className="h-full  flex items-center px-2 text-2xl">
									&#45;
								</button>
								<span className="flex items-center justify-center flex-1">1</span>
								<button type="button" className="h-full  flex items-center px-2 text-2xl">
									&#43;
								</button>
							</div>

							<button className="flex-1 btn btn-primary gap-10">
								<span>N2,500</span> Add
							</button>
						</div>
					</form>
				</div>
			</div>
		</dialog>
	);
}

export default AddProductModal;

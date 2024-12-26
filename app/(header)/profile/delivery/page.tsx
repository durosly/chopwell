import IconArrowLeft from "@/icons/arrow-left";
import IconLocation from "@/icons/location";
import IconPhone from "@/icons/phone";
import IconTrash from "@/icons/trash";
import IconWhatsapp from "@/icons/whatsapp";

function DeliveryPage() {
	return (
		<>
			<div className="flex flex-wrap items-center justify-between gap-5 px-5 mb-5 py-4">
				<button className="btn btn-xs btn-square border-none">
					<IconArrowLeft />
				</button>
				<h2 className="text-xl font-bold">Delivery Address</h2>
				<button className="btn btn-xs btn-square border-none">
					<IconTrash />
				</button>
			</div>
			<form action="">
				<div className="px-5 space-y-5">
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text-alt text-dark">Address</span>
						</div>
						<div className="input bg-neutral flex items-center gap-2">
							<IconLocation className="h-4 w-4" />

							<input type="text" className="grow text-xs" placeholder="Enter your address in details" />
						</div>
					</label>

					<div>
						<div className="mb-2">
							<h3 className="font-bold">Delivery Details</h3>
							<p className="text-[#797373] text-xs">it helps us find you easier</p>
						</div>

						<label className="form-control">
							{/* <div className="label">
							<span className="label-text-alt">Describe your building</span>
						</div> */}
							<textarea className="textarea bg-neutral h-24" placeholder="Building information..."></textarea>
							<div className="label">
								<span className="label-text-alt italic">*specify a notable landmark</span>
							</div>
						</label>
					</div>
					<div>
						<div className="mb-2">
							<h3 className="font-bold">Preferred contact method</h3>
							<p className="text-[#797373] text-xs">To easily notify you when your delivery arrives</p>
						</div>

						<label className="form-control mb-3">
							<div className="label">
								<span className="label-text-alt">Phone number</span>
							</div>
							<label className="input bg-neutral flex items-center gap-2">
								<span className="text-xs text-[#797373]">+234</span>
								<input type="text" className="grow text-xs" placeholder="7063..." />
							</label>
						</label>

						<div className="form-control flex-row gap-5 justify-between">
							<div className="flex-1">
								<input type="radio" name="pref-contact" id="pref-contact-1" className="hidden peer/phone" />
								<label
									className="btn btn-block btn-md btn-secondary rounded-full text-dark peer-checked/phone:bg-dark peer-checked/phone:text-secondary"
									htmlFor="pref-contact-1">
									<IconPhone className="w-6 h-6" />
									<span>Phone call</span>
								</label>
							</div>
							<div className="flex-1">
								<input type="radio" name="pref-contact" id="pref-contact-2" className="hidden peer/whatsapp" />
								<label
									className="btn btn-block btn-md btn-secondary rounded-full text-dark peer-checked/whatsapp:bg-dark peer-checked/whatsapp:text-secondary"
									htmlFor="pref-contact-2">
									<IconWhatsapp className="w-6 h-6" />
									<span>Whatsapp</span>
								</label>
							</div>
						</div>
					</div>
				</div>

				<div className="p-3 my-3 shadow-2xl mb-5 border-t sticky bottom-0">
					<button className="btn btn-block btn-sm btn-primary rounded-full">Save address</button>
				</div>
			</form>

			<dialog className="modal modal-open">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-square border-none bg-secondary/80 text-[#292D32] rounded-[8px] p-1 absolute right-2 top-2">
							✕
						</button>
					</form>
					<div>
						<div className="mt-5 mb-8 text-center">
							<h3 className="font-bold text-[28px]">Remove this delivery</h3>
							<p className="text-[#797373]">Are you sure you want to delete your delivery address?</p>
						</div>
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

export default DeliveryPage;

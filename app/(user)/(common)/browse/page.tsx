import IconArrowLeft from "@/icons/arrow-left";
import BrowseList from "../_components/browse-list";
import TwoThumbsDraggableTrack from "./_components/range-2";

function BrowsePage() {
	return (
		<>
			<div className="px-5 mb-5">
				<div className="flex justify-between gap-5 flex-wrap">
					<div className="flex items-center gap-5">
						<span>Sort by:</span>
						<span className="flex items-center gap-1 text-primary cursor-pointer">
							Relevance{" "}
							<IconArrowLeft className="w-5 h-5 -rotate-90" />
						</span>
					</div>
					<div className="flex items-center gap-5">
						<span>Filter by:</span>
						<span className="flex items-center gap-1 text-primary cursor-pointer">
							Price{" "}
							<IconArrowLeft className="w-5 h-5 -rotate-90" />
						</span>
					</div>
				</div>
			</div>

			<BrowseList />

			{/* filter modal */}
			{/* <button className="btn" onClick={()=>document.getElementById('relevance-modal').showModal()}>open modal</button> */}
			<dialog id="filter-modal" className="modal modal-open modal-bottom">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg text-center mb-3">
						Filter
					</h3>
					<hr />
					<div className="form-control">
						<label className="label cursor-pointer">
							<span className="label-text">
								Price range
							</span>
						</label>
						{/* <DoubleRangeSlider /> */}

						<TwoThumbsDraggableTrack rtl={false} />
					</div>

					<div className="form-control">
						<label className="label cursor-pointer">
							<span className="label-text">
								Hour special
							</span>
						</label>
						<div className="flex gap-2">
							<input
								type="radio"
								name="radio-10"
								className="btn btn-sm rounded-full checked:bg-primary"
								aria-label="Breakfast"
							/>
							<input
								type="radio"
								name="radio-10"
								className="btn btn-sm rounded-full checked:bg-primary"
								aria-label="Lunch"
							/>
							<input
								type="radio"
								name="radio-10"
								className="btn btn-sm rounded-full checked:bg-primary"
								aria-label="Dinner"
							/>
						</div>
					</div>
					<hr className="my-5" />
					<div className="flex gap-5">
						<button className="btn rounded-full flex-1">
							Clear All
						</button>
						<button className="btn btn-primary rounded-full flex-1">
							Apply
						</button>
					</div>
					<p className="py-4 text-xs mt-10 text-gray-500">
						* Press ESC key or click outside to close
					</p>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>

			{/* Relevance modal */}
			{/* <dialog id="relevance-modal" className="modal modal-open modal-bottom">
				<div className="modal-box">
					<form method="dialog">
					
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg text-center mb-3">
						Sort By
					</h3>
					<hr />
					<div className="form-control">
						<label className="label cursor-pointer">
							<span className="label-text">
								Relevance
							</span>
							<input
								type="radio"
								name="radio-10"
								className="radio radio-xs checked:bg-primary"
							/>
						</label>
					</div>
					<div className="form-control">
						<label className="label cursor-pointer">
							<span className="label-text">Price</span>
							<input
								type="radio"
								name="radio-10"
								className="radio radio-xs checked:bg-primary"
							/>
						</label>
					</div>
					<div className="form-control">
						<label className="label cursor-pointer">
							<span className="label-text">Rating</span>
							<input
								type="radio"
								name="radio-10"
								className="radio radio-xs checked:bg-primary"
							/>
						</label>
					</div>
					<p className="py-4 text-xs">
						* Press ESC key or click outside to close
					</p>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog> */}
		</>
	);
}

export default BrowsePage;

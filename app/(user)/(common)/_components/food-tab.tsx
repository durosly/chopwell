import IconTruck from "@/icons/truck";

function FoodTab() {
	return (
		<div className="mb-10">
			<h2 className="text-xl font-bold px-5 mb-5">Food</h2>

			<div role="tablist" className="carousel carousel-center px-5 w-full gap-3">
				<a
					role="tab"
					className="carousel-item bg-neutral p-3 rounded-2xl items-center gap-2">
					<IconTruck className="w-5 h-5" />
					<span>Delivery</span>
				</a>
				<a
					role="tab"
					className="carousel-item bg-neutral p-3 rounded-2xl items-center gap-2">
					<IconTruck className="w-5 h-5" />
					<span>Takeaway</span>
				</a>
				<a
					role="tab"
					className="carousel-item bg-neutral p-3 rounded-2xl items-center gap-2">
					<IconTruck className="w-5 h-5" />
					<span>Delivery</span>
				</a>
				<a
					role="tab"
					className="carousel-item bg-neutral p-3 rounded-2xl items-center gap-2">
					<IconTruck className="w-5 h-5" />
					<span>Delivery</span>
				</a>
			</div>
		</div>
	);
}

export default FoodTab;

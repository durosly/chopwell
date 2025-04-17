function ToppingsCategory() {
	return (
		<div className="mb-5">
			<div role="tablist" className="carousel carousel-center px-5 w-full gap-3">
				<a
					role="tab"
					className="carousel-item px-3 py-2 rounded-[8px] items-center gap-2">
					<span>All</span>
				</a>
				<a
					role="tab"
					className="carousel-item px-3 py-2 rounded-[8px] items-center gap-2">
					<span>Salad</span>
				</a>
				<a
					role="tab"
					className="carousel-item px-3 py-2 rounded-[8px] items-center gap-2">
					<span>Vegetable</span>
				</a>
				<a
					role="tab"
					className="carousel-item px-3 py-2 rounded-[8px] items-center gap-2">
					<span>Drink</span>
				</a>
				<a
					role="tab"
					className="carousel-item px-3 py-2 rounded-[8px] items-center gap-2">
					<span>Soft Drink</span>
				</a>
				<a
					role="tab"
					className="carousel-item px-3 py-2 rounded-[8px] items-center gap-2">
					<span>Healthy Options</span>
				</a>
			</div>
		</div>
	);
}

export default ToppingsCategory;

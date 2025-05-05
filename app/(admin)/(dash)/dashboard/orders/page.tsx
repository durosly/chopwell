"use client";

import FilterForm from "./_components/filter-form";
import OrderList from "./_components/order-list";

function AdminOrdersPage() {
	return (
		<div className="px-4 md:px-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold mb-4">Orders</h1>

				{/* Search and Filter Section */}
				<FilterForm />
			</div>

			{/* Orders Table */}
			<OrderList />
		</div>
	);
}

export default AdminOrdersPage;

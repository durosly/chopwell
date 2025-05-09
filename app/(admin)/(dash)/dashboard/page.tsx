import { Suspense } from "react";
import OrdersAnalytics from "./_components/analytics/OrdersAnalytics";
import UsersAnalytics from "./_components/analytics/UsersAnalytics";
import DepositsAnalytics from "./_components/analytics/DepositsAnalytics";

function AdminDashboard() {
	return (
		<div className="container mx-auto p-4 space-y-8">
			<h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

			<Suspense
				fallback={
					<div className="flex items-center justify-center h-64">
						<span className="loading loading-spinner loading-lg"></span>
					</div>
				}>
				<OrdersAnalytics />
			</Suspense>

			<Suspense
				fallback={
					<div className="flex items-center justify-center h-64">
						<span className="loading loading-spinner loading-lg"></span>
					</div>
				}>
				<UsersAnalytics />
			</Suspense>

			<Suspense
				fallback={
					<div className="flex items-center justify-center h-64">
						<span className="loading loading-spinner loading-lg"></span>
					</div>
				}>
				<DepositsAnalytics />
			</Suspense>
		</div>
	);
}

export default AdminDashboard;

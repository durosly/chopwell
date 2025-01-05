import { auth } from "@/auth";

async function AdminDashboardPage() {
	const session = await auth();

	return (
		<div>
			<p className="truncate">{JSON.stringify(session)}</p>
		</div>
	);
}

export default AdminDashboardPage;

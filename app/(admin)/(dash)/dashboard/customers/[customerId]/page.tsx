import { auth } from "@/auth";
import connectMongo from "@/lib/connectMongo";
import UserModel from "@/models/user";
import { notFound } from "next/navigation";
import BackButton from "@/app/_components/back-button";
import IconArrowLeft from "@/icons/arrow-left";
import CustomerOrders from "./_components/customer-orders";
import DisableAccount from "./_components/disable-account";

async function CustomerDetailsPage({ params }: { params: Promise<{ customerId: string }> }) {
	const { customerId } = await params;
	const session = await auth();
	if (!session?.user) return null;

	await connectMongo();
	const customer = await UserModel.findById(customerId).select("-password");

	if (!customer) {
		notFound();
	}

	return (
		<div className="container mx-auto p-4">
			<div className="flex items-center gap-4 mb-8">
				<BackButton className="btn btn-ghost btn-square">
					<IconArrowLeft className="size-5" />
				</BackButton>
				<h1 className="text-2xl font-semibold">Customer Details</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Customer Information */}
				<div className="card bg-base-100">
					<div className="card-body">
						<div className="flex justify-between items-center mb-4">
							<h2 className="card-title text-lg">
								Customer Information
							</h2>
							<DisableAccount
								userId={customerId}
								isDisabled={customer.disabled}
							/>
						</div>
						<div className="space-y-2">
							<p>
								<span className="font-medium">
									Name:
								</span>{" "}
								{customer.firstname}{" "}
								{customer.lastname}
							</p>
							{customer.phone && (
								<p>
									<span className="font-medium">
										Phone:
									</span>{" "}
									{customer.phone}
								</p>
							)}
							{customer.email && (
								<p>
									<span className="font-medium">
										Email:
									</span>{" "}
									{customer.email}
								</p>
							)}
							<p>
								<span className="font-medium">
									Status:
								</span>{" "}
								<span
									className={`badge ${customer.disabled ? "badge-error" : "badge-success"}`}>
									{customer.disabled
										? "Disabled"
										: "Active"}
								</span>
							</p>
							<p>
								<span className="font-medium">
									Joined:
								</span>{" "}
								{new Date(
									customer.createdAt
								).toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>

				{/* Order History */}
				<div className="card bg-base-100">
					<div className="card-body">
						<h2 className="card-title text-lg">
							Order History
						</h2>
						<CustomerOrders customerId={customerId} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CustomerDetailsPage;

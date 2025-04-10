import BackButton from "@/app/_components/back-button";
import { auth } from "@/auth";
import IconArrowLeft from "@/icons/arrow-left";
import connectMongo from "@/lib/connectMongo";
import AddressModel from "@/models/address";
import { notFound } from "next/navigation";
import EditAddressForm from "./_components/edit-address-form";
import DeleteModal from "./_components/delete-modal";

async function AccountFormType({ params }: { params: Promise<{ type: string }> }) {
	const { type } = await params;
	const session = await auth();
	const userId = session?.user.id;
	await connectMongo();
	const address = await AddressModel.findOne({ _userId: userId, _id: type }).populate(
		"_regionId"
	);

	if (!address) return notFound();

	const formattedAddresses = {
		_id: address.id,
		landmark: address.landmark,
		location: address.location,
		region: address._regionId.id, // Store only the region ID
		deliveryPrice: address._regionId.deliveryPrice,
		title: address._regionId.title,
	};

	return (
		<>
			<div className="flex items-center mt-5 mb-10 gap-5 pr-10">
				<BackButton className="btn btn-sm btn-ghost">
					<IconArrowLeft className="w-6 h-6" />
				</BackButton>
				<h2 className="text-2xl font-bold text-center flex-1">
					Edit {formattedAddresses.title} Address
				</h2>
			</div>
			<div className="max-w-md mx-auto mb-10">
				<div className="card bg-base-100">
					<div className="card-body">
						<EditAddressForm
							existingAddress={formattedAddresses}
						/>

						<DeleteModal addressId={formattedAddresses._id} />
					</div>
				</div>
			</div>
		</>
	);
}

export default AccountFormType;

"use client";

import { useMakeAddressDefault } from "@/hooks/useAddress";

function MakeAddressDefaultBtn({ addressId }: { addressId: string }) {
	const { mutate: makeAddressDefault, isPending } = useMakeAddressDefault();
	return (
		<button
			className="btn btn-xs btn-outline"
			onClick={() => makeAddressDefault(addressId)}>
			{isPending ? "Updating..." : "Make Default"}
		</button>
	);
}

export default MakeAddressDefaultBtn;

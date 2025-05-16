"use client";

import { useAddNewCartGroup } from "@/hooks/useCart";
import { LuPlus } from "react-icons/lu";

function AddNewCartGroupButton() {
	const { mutate, isPending } = useAddNewCartGroup();
	return (
		<button
			disabled={isPending}
			onClick={() => mutate()}
			className="btn btn-sm btn-square btn-ghost">
			<LuPlus className="size-4" />
		</button>
	);
}

export default AddNewCartGroupButton;

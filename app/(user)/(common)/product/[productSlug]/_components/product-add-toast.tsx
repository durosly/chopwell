import IconArrowLeft from "@/icons/arrow-left";
import Link from "next/link";

function ProductAddToast() {
	return (
		<div className="p-3 my-3 shadow-xl">
			<div className="bg-primary text-neutral p-2 rounded-full flex justify-between  font-bold">
				<div className="space-x-2">
					<span className="badge badge-secondary text-primary rounded-full aspect-square">1</span>
					<span>N 2,500</span>
				</div>

				<Link className="flex gap-2 items-center" href="/cart">
					Go to cart <IconArrowLeft className="w-5 h-5 rotate-180" />
				</Link>
			</div>
		</div>
	);
}

export default ProductAddToast;

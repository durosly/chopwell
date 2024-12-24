import IconArrowLeft from "@/icons/arrow-left";
import IconShare from "@/icons/share-icon";
import Image from "next/image";

function ProductImage() {
	return (
		<div className="shadow-md border-[0.5px] flex-col rounded-2xl overflow-hidden -mb-5">
			<div className="relative h-[300px]">
				<Image src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp" alt="Burger" fill className="object-cover" />
				<div className="absolute top-0 w-full flex justify-between p-4">
					<button className="btn btn-sm btn-square border-none bg-secondary/80 text-secondary rounded-[8px] p-1">
						<IconArrowLeft className="text-[#292D32]" />
					</button>
					<button className="btn btn-sm btn-square border-none bg-secondary/80 text-secondary rounded-[8px] p-1">
						<IconShare className="text-[#292D32]" />
					</button>
				</div>

				<div className="absolute bottom-0 pb-8 pl-4">
					<span className="badge badge-sm badge-primary">Support local</span>
				</div>
			</div>
		</div>
	);
}

export default ProductImage;

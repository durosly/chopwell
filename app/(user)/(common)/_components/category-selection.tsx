import Image from "next/image";
import Link from "next/link";

function CategorySelection() {
	return (
		<div className="carousel carousel-center items-start px-5 gap-4 w-full mb-10">
			<Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] rounded-full overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Pizza</p>
			</Link>
			<Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] rounded-full overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Semo</p>
			</Link>
			<Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] rounded-full overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Rice</p>
			</Link>
			<Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] rounded-full overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Fried Rice</p>
			</Link>
			<Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] rounded-full overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Garri</p>
			</Link>
			<Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] rounded-full overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Salad</p>
			</Link>
			<Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] rounded-full overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Chicken</p>
			</Link>
		</div>
	);
}

export default CategorySelection;

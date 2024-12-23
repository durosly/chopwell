import Image from "next/image";
import Link from "next/link";

function TimebaseSuggestions() {
	return (
		<div className="mb-10">
			<div className="flex flex-wrap items-center justify-between gap-5 px-5 mb-5">
				<h2 className="text-xl font-bold">Top Pick for breakfast</h2>
				<Link href="/" className="btn bg-neutral text-primary border-none rounded-[50px]">
					See all
				</Link>
			</div>

			<div className="carousel carousel-center h-[200px] px-5 gap-2">
				<div className="carousel-item relative rounded-2xl overflow-hidden">
					<Image
						width={150}
						height={200}
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Burger"
						className="object-cover"
					/>
					<div className="flex items-end absolute inset-0 bg-black/40 p-2">
						<p className="text-xs text-white">Jollof Rice with chicken and cold...</p>
					</div>
				</div>
				<div className="carousel-item relative rounded-2xl overflow-hidden">
					<Image
						width={150}
						className="object-cover"
						height={200}
						src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
						alt="Burger"
					/>
					<div className="flex items-end absolute inset-0 bg-black/40 p-2">
						<p className="text-xs text-white">Jollof Rice with chicken and cold...</p>
					</div>
				</div>
				<div className="carousel-item relative rounded-2xl overflow-hidden">
					<Image
						width={150}
						className="object-cover"
						height={200}
						src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
						alt="Burger"
					/>
					<div className="flex items-end absolute inset-0 bg-black/40 p-2">
						<p className="text-xs text-white">Jollof Rice with chicken and cold...</p>
					</div>
				</div>
				<div className="carousel-item relative rounded-2xl overflow-hidden">
					<Image
						width={150}
						className="object-cover"
						height={200}
						src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
						alt="Burger"
					/>
					<div className="flex items-end absolute inset-0 bg-black/40 p-2">
						<p className="text-xs text-white">Jollof Rice with chicken and cold...</p>
					</div>
				</div>
				<div className="carousel-item relative rounded-2xl overflow-hidden">
					<Image
						width={150}
						className="object-cover"
						height={200}
						src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
						alt="Burger"
					/>
					<div className="flex items-end absolute inset-0 bg-black/40 p-2">
						<p className="text-xs text-white">Jollof Rice with chicken and cold...</p>
					</div>
				</div>
				<div className="carousel-item relative rounded-2xl overflow-hidden">
					<Image
						width={150}
						className="object-cover"
						height={200}
						src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
						alt="Burger"
					/>
					<div className="flex items-end absolute inset-0 bg-black/40 p-2">
						<p className="text-xs text-white">Jollof Rice with chicken and cold...</p>
					</div>
				</div>
				<div className="carousel-item relative rounded-2xl overflow-hidden">
					<Image
						width={150}
						className="object-cover"
						height={200}
						src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
						alt="Burger"
					/>
					<div className="flex items-end absolute inset-0 bg-black/40 p-2">
						<p className="text-xs text-white">Jollof Rice with chicken and cold...</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TimebaseSuggestions;

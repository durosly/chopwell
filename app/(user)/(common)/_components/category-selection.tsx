import getCategories from "@/actions/get-categories";
import connectMongo from "@/lib/connectMongo";
import { CategoryDocument } from "@/models/category";
import Image from "next/image";
import Link from "next/link";

async function CategorySelection() {
	await connectMongo();
	const categories = await getCategories({ limit: 6 });

	if (!categories || !categories.length) return null;

	return (
		<div className="carousel carousel-center md:justify-center items-start px-5 gap-4 w-full mb-10">
			{Array.isArray(categories) &&
				categories.map((category: CategoryDocument) => (
					<Link
						key={category._id as string}
						href={`/browse?category=${category._id}`}
						className="carousel-item flex-col items-center">
						<div className="relative aspect-square w-[80px] md:w-[120px] rounded-full md:rounded-xl overflow-hidden">
							<Image
								fill
								src={category.cover_image}
								placeholder="blur"
								blurDataURL={
									category.coverImagePlaceholder
								}
								alt="Pizza"
							/>
						</div>
						<p className="font-bold mt-2">{category.name}</p>
					</Link>
				))}
			{/* <Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] md:w-[120px] rounded-full md:rounded-xl overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Semo</p>
			</Link>
			<Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] md:w-[120px] rounded-full md:rounded-xl overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Rice</p>
			</Link>
			<Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] md:w-[120px] rounded-full md:rounded-xl overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Fried Rice</p>
			</Link>
			<Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] md:w-[120px] rounded-full md:rounded-xl overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Garri</p>
			</Link>
			<Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] md:w-[120px] rounded-full md:rounded-xl overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Salad</p>
			</Link>
			<Link href="/" className="carousel-item flex-col items-center">
				<div className="relative aspect-square w-[80px] md:w-[120px] rounded-full md:rounded-xl overflow-hidden">
					<Image
						fill
						src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
						alt="Pizza"
					/>
				</div>
				<p className="font-bold mt-2">Chicken</p>
			</Link> */}
		</div>
	);
}

export default CategorySelection;

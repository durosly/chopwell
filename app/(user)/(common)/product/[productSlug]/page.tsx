import Image from "next/image";
import BackButton from "@/app/_components/back-button";
import IconArrowLeft from "@/icons/arrow-left";
import IconHeart from "@/icons/heart";
import IconShare from "@/icons/share-icon";
import FoodModel from "@/models/food";
import connectMongo from "@/lib/connectMongo";
import commaNumber from "@/utils/comma-number";
import FavBtn from "../../_components/fav-btn";
import CartBtn from "../../_components/cart-btn";
import ShareBtn from "./_components/share-btn";

export async function generateMetadata({ params }: { params: { productSlug: string } }) {
	const { productSlug } = await params;
	const product = await FoodModel.findOne({ slug: productSlug });

	if (!product) {
		return {
			title: "Product not found",
			description: "Product not found",
		};
	}

	return {
		title: product.name,
		description: product.full_desc,
		openGraph: {
			images: [product.image],
		},
	};
}

async function ProductDetailsPage({ params }: { params: Promise<{ productSlug: string }> }) {
	const { productSlug } = await params;

	await connectMongo();

	const product = await FoodModel.findOne({ slug: productSlug });

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<main className="max-w-2xl mx-auto mb-10">
			<div className="card bg-base-100  overflow-hidden rounded-2xl -mb-5">
				<div className="relative h-[400px]">
					<Image
						src={product.image}
						alt={product.name}
						fill
						className="object-cover"
						priority
						sizes="(min-width: 720px) 672px, calc(93vw + 21px)"
					/>
					<div className="absolute top-0 w-full flex justify-between p-4">
						<BackButton className="btn btn-sm btn-circle glass text-base-content">
							<IconArrowLeft className="w-4 h-4" />
						</BackButton>
						<ShareBtn
							title={product.name}
							description={product.full_desc}
							className="btn btn-sm btn-circle glass text-base-content">
							<IconShare className="w-4 h-4" />
						</ShareBtn>
					</div>

					<div className="absolute bottom-0 pb-8 pl-4">
						<span className="badge badge-lg badge-primary glass">
							Support local
						</span>
					</div>
				</div>
			</div>

			<div className="card bg-base-100 border rounded-2xl">
				<div className="card-body p-6">
					<div className="flex items-center justify-between gap-4 mb-6">
						<h2 className="card-title text-2xl">
							{product.name}
						</h2>
						<FavBtn
							foodId={product.id as string}
							className="btn btn-ghost btn-circle"
							activeClassName="text-primary">
							<IconHeart className="size-6" />
						</FavBtn>
					</div>

					<div className="stats stats-vertical lg:stats-horizontal shadow w-full mb-6">
						<div className="stat place-items-center">
							<div className="stat-title text-sm">
								Delivery time
							</div>
							<div className="stat-value text-lg">
								{Math.round(
									product.preparation_time -
										product.preparation_time *
											0.3
								)}
								-{product.preparation_time} mins
							</div>
						</div>
						<div className="stat place-items-center">
							<div className="stat-title text-sm">
								Rating
							</div>
							<div className="stat-value text-lg">
								{product.average_rating.toFixed(1)}
							</div>
						</div>
						<div className="stat place-items-center">
							<div className="stat-title text-sm">
								Price
							</div>
							<div className="stat-value text-lg">
								{commaNumber(product.price)}
							</div>
						</div>
						<div className="stat place-items-center">
							<div className="stat-title text-sm">
								Delivery fee
							</div>
							<div className="stat-value text-lg">
								NG 0
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div>
							<h3 className="text-xl font-semibold mb-2">
								Description
							</h3>
							<p className="text-base-content/80">
								{product.full_desc}
							</p>
						</div>

						<div className="card-actions justify-end">
							<CartBtn
								foodId={product.id as string}
								className="btn btn-primary btn-block disabled:bg-gray-100 disabled:cursor-not-allowed">
								Add to cart
							</CartBtn>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default ProductDetailsPage;

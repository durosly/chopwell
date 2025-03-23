import BackButton from "@/app/_components/back-button";
import IconArrowLeft from "@/icons/arrow-left";
import Image from "next/image";
import Link from "next/link";

function OrderPage() {
	return (
		<div className="p-2">
			<div className="flex flex-wrap items-center justify-between gap-5 px-5 mb-5 py-4">
				<BackButton className="btn btn-xs btn-square border-none">
					<IconArrowLeft />
				</BackButton>
				<h2 className="text-xl font-bold flex-1 text-center">My Orders</h2>
			</div>

			<div className="px-3">
				<ul className="space-y-8">
					{Array.from({ length: 4 }).map((_, index) => (
						<li key={index}>
							<h2 className="text-xl font-bold text-gray-500 mb-5">
								20 Jan
							</h2>

							<div className="border p-5 rounded-box">
								<div className="flex gap-5 mb-5">
									<div className="relative w-[85px] h-[85px] rounded-2xl overflow-hidden">
										<Image
											src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
											alt="Burger"
											fill
											className="object-cover"
										/>
									</div>

									<div>
										<h3>
											Hot Jollof
											Rice
										</h3>
										<div className="text-xs text-gray-400">
											<p>
												4
												items
												x
												N2,500
											</p>
											<p>
												University
												library
											</p>
										</div>
									</div>
								</div>

								<div className="space-y-2">
									<button className="btn btn-primary btn-block rounded-full">
										Re-order
									</button>
									<Link
										href={`/orders/${index}`}
										className="btn btn-ghost btn-block">
										View Order
									</Link>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default OrderPage;

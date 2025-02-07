import IconArrowLeft from "@/icons/arrow-left";
import IconDoubleCard from "@/icons/cards";
import IconCheck from "@/icons/check";
import IconCopy from "@/icons/copy";
import IconPhone from "@/icons/phone";
import IconWhatsapp from "@/icons/whatsapp";
import logo from "@/public/images/chopwell-logo-dark.png";
import Image from "next/image";
import Link from "next/link";

function OrderDetails() {
	return (
		<div className="p-2">
			<div className="flex flex-wrap items-center justify-between gap-5 px-5 mb-5 py-4">
				<button className="btn btn-xs btn-square border-none">
					<IconArrowLeft />
				</button>
				<h2 className="text-xl font-bold flex-1 text-center">Your Order</h2>
			</div>

			<div className="text-[12px] text-center bg-gray-100 p-2 rounded-box mb-10">
				<h3 className="text-primary mb-3">Order status</h3>
				<div className="mb-5">
					<p className="mb-2">Order ID: </p>
					<button className="bg-neutral p-2 rounded flex items-center gap-1 mx-auto">
						<span className="font-bold">265435673</span>
						<div className="">
							<IconCopy className="w-4 h-4 text-[#C2C2C2]" />
						</div>
					</button>
				</div>

				<div>
					<ul className="flex gap-2 justify-center items-center mb-3">
						{Array.from({ length: 4 })

							.map((_, i) => (
								<li key={i}>
									<span className="w-8 h-8 aspect-square rounded-full flex justify-center items-center bg-primary text-secondary">
										<IconCheck className="w-3 h-3" />
									</span>
								</li>
							))}
					</ul>
					<p className="text-[#3A3939]">Order recieved</p>
				</div>
			</div>

			<div className="flex items-center gap-5 border rounded-box p-2 mb-10">
				<div className="relative h-[50px] w-[120px]">
					<Image
						src={logo}
						alt="chopwell"
						fill
						className="object-contain"
					/>
				</div>

				<div className="flex gap-5 flex-wrap">
					<a
						className="btn btn-sm bg-gray-100 rounded-full border-none "
						href="tel://+2347063069903"
						target="_blank"
						rel="noopener noreferrer">
						<IconPhone className="w-7 h-7" />
						<span>Phone</span>
					</a>
					<a
						className="btn btn-sm bg-gray-100 rounded-full border-none "
						href="https://wa.me/+2347063069903"
						target="_blank"
						rel="noopener noreferrer">
						<IconWhatsapp className="w-7 h-7" />
						<span>Whatsapp</span>
					</a>
				</div>
			</div>

			<div className="bg-gray-50 p-2 rounded-box mb-10">
				<div className="flex items-center gap-5 mb-5">
					<h2 className="font-bold flex-1 text-center">
						Your Order Summary
					</h2>
					<button className="bg-neutral p-2 rounded flex items-center gap-1 mx-auto">
						<span className="font-bold">265435673</span>
						<div className="">
							<IconCopy className="w-4 h-4 text-[#C2C2C2]" />
						</div>
					</button>
				</div>

				<ul className="space-y-8 mb-5">
					{Array.from({ length: 4 }).map((_, index) => (
						<li key={index}>
							<Link href={`/product/${index}`}>
								<div className="flex gap-5 mb-5">
									<div className="flex items-center gap-5">
										<div className="relative w-[35px] h-[35px] rounded-xl overflow-hidden">
											<Image
												src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
												alt="Burger"
												fill
												className="object-cover"
											/>
										</div>
										<h3>
											Hot Jollof
											Rice
										</h3>
									</div>

									<div className="ml-auto">
										<p className="text-sm font-bold">
											N2,500
										</p>
										<p className="text-xs text-gray-400">
											X 4 pcs
										</p>
									</div>
								</div>
							</Link>
						</li>
					))}
				</ul>

				<div className="flex justify-between items-center">
					<span>Total:</span>
					<span className="font-bold">N13,000</span>
				</div>
			</div>
			<div className="mb-10">
				<button className="btn btn-primary btn-block rounded-full">
					Re-order
				</button>
			</div>
			<div className="bg-gray-50 p-2 rounded-box mb-10">
				<h2 className="font-bold mb-5">Order details</h2>

				<ul className="space-y-5">
					{Array.from({ length: 4 }).map((_, i) => (
						<li
							key={i}
							className="flex items-center justify-between text-xs ">
							<span>Waiting for acceptance</span>
							<span>28 January 2025 at 12:34 PM</span>
						</li>
					))}
				</ul>
			</div>

			<div className="bg-gray-50 p-2 rounded-box mb-10">
				<h2 className="font-bold mb-5">Payment</h2>

				<div>
					<div className="flex gap-1 items-center">
						<IconDoubleCard className="w-10 h-10" />
						<div className="text-xs">
							<p className="font-bold">
								Mastercard ****3712
							</p>
							<p className="text-gray-400">
								08/01/2025 21:07
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderDetails;

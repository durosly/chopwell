import getCartDataAction from "@/actions/get-cart-action";
import IconArrowLeft from "@/icons/arrow-left";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { LuBadgeAlert } from "react-icons/lu";
import CartReturnPolicy from "./_components/cart-return-policy";
import CartSummary from "./_components/cart-summary";
import CartTitleCount from "./_components/cart-title-count";
import ClearCartBtn from "./_components/clear-cart-btn";
import LoaCart from "./_components/load-cart";
import PromoCodeForm from "./_components/promo-code-form";
import ShowSummaryModal from "./_components/show-summary-modal-btn";

async function CartPage() {
	const cart = await getCartDataAction();

	if (cart.status === false) {
		return (
			<div className="flex flex-col items-center justify-center min-h-14 h-[40vh]">
				<LuBadgeAlert className="w-20 h-20" />
				<p>{cart.message}</p>
			</div>
		);
	}

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["cart-full-data"],
		queryFn: () => JSON.parse(JSON.stringify(cart.data)),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{/* px-5 md:px-10 */}
			<div className="lg:mb-10">
				<div className="flex">
					<div className="py-2 flex-1">
						<div className="flex flex-wrap items-center justify-between gap-5 mb-5 py-4 px-5 md:px-10">
							<CartTitleCount />
							<ClearCartBtn />
						</div>

						<LoaCart />
					</div>
					<div className="max-lg:hidden w-80 pt-3 border-l">
						<div className="sticky top-28 ">
							<div className="border-y px-5 py-5">
								<CartSummary />
							</div>
							<PromoCodeForm />
							<div className="border-b p-5">
								<CartReturnPolicy />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="p-3 my-3 mb-5 border-t bg-base-100 lg:hidden sticky bottom-0">
				<div className="bg-primary text-primary-content p-2 rounded-full flex justify-between font-bold">
					<div className="space-x-2">
						<ShowSummaryModal />
					</div>

					<Link className="flex gap-2 items-center" href="/cart">
						Checkout{" "}
						<IconArrowLeft className="w-5 h-5 rotate-180" />
					</Link>
				</div>
			</div>
		</HydrationBoundary>
	);
}

export default CartPage;

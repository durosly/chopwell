"use client";
import { useSession } from "next-auth/react";
import CartCount from "@/app/(user)/(common)/_components/cart-count";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuShoppingCart, LuX } from "react-icons/lu";
import PopupCartItemLoader from "./popup-cart-item-loader";
import Link from "next/link";
import PopupCartListing from "./popup-cart-listing";
import DisplayUserBalance from "./display-user-balance";
import useCartStore from "@/store/cart-store";
import pluralize from "pluralize";

function PopupCartModal() {
	const { data: session } = useSession();
	const { cart } = useCartStore();
	const containerRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef<HTMLDialogElement>(null);
	const [constraints, setConstraints] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

	useEffect(() => {
		const updateConstraints = () => {
			if (!containerRef.current) return;

			const { offsetWidth, offsetHeight } = containerRef.current;
			const padding = 20;
			setConstraints({
				left: -window.innerWidth + offsetWidth + padding,
				top: -window.innerHeight + offsetHeight + padding,
				right: -padding,
				bottom: -padding,
			});
		};

		updateConstraints();
		window.addEventListener("resize", updateConstraints);

		return () => {
			window.removeEventListener("resize", updateConstraints);
		};
	}, []);

	function handleOpenModal() {
		setIsOpen(true);
	}

	function handleDragEnd() {
		setIsOpen(false);
	}

	function handleCloseModal() {
		setIsOpen(false);
	}

	return (
		<>
			<motion.button
				ref={containerRef}
				drag
				dragConstraints={constraints}
				dragElastic={0.1}
				onDragEnd={handleDragEnd}
				onClick={handleOpenModal}
				className={cn(
					"btn btn-circle btn-primary fixed bottom-5 right-5 z-50 cursor-pointer",
					"active:cursor-grabbing"
				)}>
				<LuShoppingCart className="h-6 w-6" />
				<CartCount />
			</motion.button>
			{isOpen && (
				<dialog
					ref={modalRef}
					className={cn(
						"modal modal-bottom sm:modal-middle backdrop-blur-xs",
						isOpen ? "modal-open" : ""
					)}>
					<div className="modal-box">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button
								onClick={handleCloseModal}
								className="absolute right-2 top-2 max-sm:right-1/2 max-sm:translate-x-1/2 cursor-pointer">
								<LuX className="size-5 max-sm:hidden" />

								<LuChevronDown className="size-8 sm:hidden" />
							</button>
						</form>
						<div className="flex justify-between gap-5 mb-4 mt-2">
							<div className="join">
								<span
									className={cn(
										"badge badge-sm badge-square join-item",
										cart.length > 0
											? "badge-primary"
											: "badge-neutral"
									)}>
									{cart.length}
								</span>
								<span className="badge badge-sm badge-dash join-item">
									{pluralize(
										"item",
										cart.length
									)}
								</span>
							</div>
							{session ? (
								<>
									<p className="text-sm font-bold">
										<DisplayUserBalance />
									</p>
								</>
							) : (
								<div className="flex items-center gap-2 text-sm">
									<Link href="/signup">
										Register
									</Link>
									|
									<Link href="/login">
										Login
									</Link>
								</div>
							)}
						</div>
						{cart.length > 0 ? (
							<>
								<PopupCartListing />
							</>
						) : (
							<PopupCartItemLoader />
						)}
					</div>
					<form method="dialog" className="modal-backdrop">
						<button onClick={handleCloseModal}>close</button>
					</form>
				</dialog>
			)}
		</>
	);
}

export default PopupCartModal;

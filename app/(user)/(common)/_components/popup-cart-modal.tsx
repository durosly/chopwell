"use client";

import CartCount from "@/app/(user)/(common)/_components/cart-count";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import PopupCartItemLoader from "./popup-cart-item-loader";

function PopupCartModal() {
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
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">Shopping Cart</h3>
					<PopupCartItemLoader />
					{/* <p className="py-4">Your cart items will appear here</p> */}
					{/* <div className="modal-action"></div> */}
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default PopupCartModal;

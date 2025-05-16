"use client";
import { useSession } from "next-auth/react";
import CartCount from "@/app/(user)/(common)/_components/cart-count";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuCopy, LuLink, LuShoppingCart, LuX } from "react-icons/lu";
import PopupCartItemLoader from "./popup-cart-item-loader";
import Link from "next/link";
import PopupCartListing from "./popup-cart-listing";
import DisplayUserBalance from "./display-user-balance";
import useCartStore from "@/store/cart-store";
import pluralize from "pluralize";
import QRCode from "react-qr-code";
import CopyToClipboardButton from "../user/orders/[orderId]/_components/copy-to-clipboard";
import {
	FacebookShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";

function PopupCartModal() {
	const { data: session } = useSession();
	const { cart, cartModal, openCartModal, closeCartModal, orderCode } = useCartStore();
	const containerRef = useRef(null);
	// const [isOpen, setIsOpen] = useState(false);
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
		openCartModal();
	}

	function handleDragEnd() {
		closeCartModal();
	}

	function handleCloseModal() {
		closeCartModal();
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
			{cartModal && (
				<dialog
					ref={modalRef}
					className={cn(
						"modal modal-bottom sm:modal-middle backdrop-blur-xs",
						cartModal ? "modal-open" : ""
					)}>
					<div className="modal-box">
						{orderCode ? (
							<div className="">
								<div className="flex flex-wrap justify-center items-center gap-2 sm:gap-5 mb-5">
									<div className="size-32 bg-base-200">
										<QRCode
											size={256}
											style={{
												height: "100%",
												width: "100%",
											}}
											level="M"
											value={`${process.env.NEXT_PUBLIC_URL}?orderCode=${orderCode}`}
											viewBox={`0 0 256 256`}
										/>
									</div>
									<div>
										<p className="text-xs">
											Order Code
										</p>
										<div className="flex items-center gap-5">
											<p className="uppercase font-bold text-2xl sm:text-4xl">
												{
													orderCode
												}
											</p>
											<CopyToClipboardButton
												code={orderCode.toUpperCase()}>
												<LuCopy className="size-5" />
											</CopyToClipboardButton>
										</div>
									</div>
								</div>
								<div className="text-center">
									<p>
										Share order code to
										your friends and
										family
									</p>

									<div className="flex justify-center flex-wrap gap-2 sm:gap-5 mb-4">
										<CopyToClipboardButton
											className="btn btn-square btn-circle btn-soft"
											code={`${process.env.NEXT_PUBLIC_URL}?orderCode=${orderCode}`}>
											<LuLink className="size-5" />
										</CopyToClipboardButton>
										<TwitterShareButton
											className="btn btn-square btn-circle"
											title="Chopwell order"
											url={`${process.env.NEXT_PUBLIC_URL}?orderCode=${orderCode}`}
											hashtags={[
												"Chopwell",
												"Order",
												"Code",
											]}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 512 512"
												className="size-5">
												<path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9L389.2 48zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8z" />
											</svg>
										</TwitterShareButton>
										<TelegramShareButton
											className="btn btn-square btn-circle"
											url={`${process.env.NEXT_PUBLIC_URL}?orderCode=${orderCode}`}
											title="Chopwell order code">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 496 512"
												className="size-5">
												<path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm115 168.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7.2-.7.3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3.7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6.5 9.6 2.9a10.5 10.5 0 013.5 6.7 43.8 43.8 0 01.5 9.9z" />
											</svg>
										</TelegramShareButton>
										<WhatsappShareButton
											className="btn btn-square btn-circle"
											url={`${process.env.NEXT_PUBLIC_URL}?orderCode=${orderCode}`}
											title="Chopwell order code">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 496 512"
												className="size-5">
												<path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />{" "}
											</svg>
										</WhatsappShareButton>
										<FacebookShareButton
											className="btn btn-square btn-circle"
											url={`${process.env.NEXT_PUBLIC_URL}?orderCode=${orderCode}`}
											hashtag={`chopwell`}
											title="Chopwell order code">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 320 512"
												className="size-5">
												{/*!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
												<path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
											</svg>
										</FacebookShareButton>
									</div>

									<button
										onClick={
											handleCloseModal
										}
										className="btn btn-primary btn-soft">
										Continue Shopping
									</button>
								</div>
							</div>
						) : (
							<>
								<form method="dialog">
									{/* if there is a button in form, it will close the modal */}
									<button
										onClick={
											handleCloseModal
										}
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
												cart.length >
													0
													? "badge-primary"
													: "badge-neutral"
											)}>
											{
												cart.length
											}
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
							</>
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

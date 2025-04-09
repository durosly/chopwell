"use client";

import { useRef } from "react";
import { LuLogOut } from "react-icons/lu";

function LogoutModal() {
	const modalRef = useRef<HTMLDialogElement>(null);
	function openModal() {
		if (modalRef.current) {
			modalRef.current.showModal();
		}
	}
	return (
		<>
			<button
				className="flex w-full items-center gap-4 py-4 px-6 hover:bg-base-200 cursor-pointer"
				onClick={openModal}>
				<LuLogOut className="w-6 h-6 text-primary" />

				<span className="text-base md:text-lg text-base-content">
					Logout
				</span>
			</button>

			<dialog ref={modalRef} className="modal">
				<div className="modal-box">
					<div className="text-center mb-10">
						<h3 className="font-bold text-lg">
							Confirm Logout!
						</h3>
						<p>Are you sure you want to logout?</p>
					</div>

					<div className="space-y-2">
						<button className="btn btn-primary btn-block rounded-full">
							Logout
						</button>
						<form method="dialog">
							<button className="btn btn-ghost btn-block rounded-full">
								Cancel
							</button>
						</form>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default LogoutModal;

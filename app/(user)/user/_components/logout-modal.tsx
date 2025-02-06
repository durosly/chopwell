"use client";

function LogoutModal() {
	function openModal() {
		// if (ref.current) {
		// 	ref.current.showModal();
		// }
		const modal: HTMLDialogElement = document.getElementById(
			"logout-modal"
		) as HTMLDialogElement;
		modal.showModal();
	}
	return (
		<>
			<button className="btn btn-ghost text-primary" onClick={openModal}>
				Logout
			</button>

			<dialog id="logout-modal" className="modal">
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

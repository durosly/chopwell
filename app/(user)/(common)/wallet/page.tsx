import BackButton from "@/app/_components/back-button";
import IconArrowLeft from "@/icons/arrow-left";
import Link from "next/link";

function WalletPage() {
	return (
		<>
			<div className="flex items-center mt-5 mb-10 gap-5 pr-10">
				<BackButton className="btn btn-sm btn-ghost">
					<IconArrowLeft className="w-6 h-6" />
				</BackButton>
				<h2 className="text-2xl font-bold text-center flex-1">Wallet</h2>
			</div>

			<div className="px-5 mb-10">
				<div className="bg-[#100E0E]/5 p-4 rounded-box">
					<p className="text-xs text-gray-500 mb-5">
						Available balance
					</p>

					<div className="flex items-center justify-between gap-5">
						<p>
							<span>N</span>
							<span className="text-3xl font-bold">
								0
							</span>
						</p>
						<Link
							className="btn btn-primary btn-sm rounded-full"
							href={"/wallet/top-up"}>
							+ Top-up
						</Link>
					</div>
				</div>
			</div>

			<div className="px-5 mb-10">
				<div className="flex justify-between items-center gap-5 mb-5">
					<h2 className="text-xl font-bold">Transactions</h2>
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-sm rounded-full bg-gray-300 border-none m-1">
							Janunary
							<IconArrowLeft className="w-5 h-5 -rotate-90" />
						</div>
						<ul
							tabIndex={0}
							className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow-xl">
							<li>
								<a>Item 1</a>
							</li>
							<li>
								<a>Item 2</a>
							</li>
						</ul>
					</div>
				</div>

				{/* empty transaction */}
				<div className="my-20">
					<p className="text-xs text-gray-500 text-center">
						You don&apos;t have any transactions yet
					</p>
				</div>

				{/* <ul className="space-y-2">
					<li className="flex items-center justify-between gap-5 p-4 bg-[#100E0E]/5 rounded-box">
						<div className="flex items-center gap-5">
							<div>
								<p className="text-sm">
									Fund account via Card
								</p>
								<p className="text-xs text-gray-500">
									12:00 PM
								</p>
							</div>
						</div>
						<div>
							<p className="text-sm text-success">
								+ N 0
							</p>
						</div>
					</li>
					<li className="flex items-center justify-between gap-5 p-4 bg-[#100E0E]/5 rounded-box">
						<div className="flex items-center gap-5">
							<div>
								<p className="text-sm">
									Placed order via Balance
								</p>
								<p className="text-xs text-gray-500">
									12:00 PM
								</p>
							</div>
						</div>
						<div>
							<p className="text-sm text-error">- N 0</p>
						</div>
					</li>
				</ul> */}
			</div>
		</>
	);
}

export default WalletPage;

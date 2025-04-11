import BackButton from "@/app/_components/back-button";
import { auth } from "@/auth";
import IconArrowLeft from "@/icons/arrow-left";
import connectMongo from "@/lib/connectMongo";
import TransactionModel from "@/models/transactions";
import WalletModel from "@/models/wallet";
import commaNumber from "@/utils/comma-number";
import Link from "next/link";

async function WalletPage() {
	const session = await auth();
	const userId = session?.user.id;
	await connectMongo();
	const wallet = await WalletModel.findOne({ _userId: userId });

	// load transactions
	const transactions = await TransactionModel.find({ _userId: userId })
		.sort("-updatedAt")
		.limit(10);

	return (
		<>
			<div className="flex items-center mt-5 mb-10 gap-5 pr-10">
				<BackButton className="btn btn-sm btn-ghost">
					<IconArrowLeft className="w-6 h-6" />
				</BackButton>
				<h2 className="text-2xl font-bold text-center flex-1">Wallet</h2>
			</div>
			<div className="max-w-2xl mx-auto mb-12">
				<div className="px-5 mb-10">
					<div className="bg-base-100 p-4 rounded-box border border-base-200">
						<p className="text-xs text-gray-500 mb-5">
							Available balance
						</p>

						<div className="flex items-center justify-between gap-5">
							<p>
								<span>N</span>
								<span className="text-3xl font-bold">
									{!wallet
										? commaNumber(0, {
												style: "decimal",
											})
										: commaNumber(
												wallet.balance,
												{
													style: "decimal",
												}
											)}
								</span>
							</p>
							<Link
								className="btn btn-primary btn-sm rounded-full"
								href={"/user/wallet/top-up"}>
								+ Top-up
							</Link>
						</div>
					</div>
				</div>

				<div className="px-5 mb-10">
					<div className="flex justify-between items-center gap-5 mb-5">
						<h2 className="text-xl font-bold">Transactions</h2>

						{/* <div className="dropdown">
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
					</div> */}
					</div>

					{/* empty transaction */}
					{transactions.length === 0 ? (
						<div className="my-20">
							<p className="text-xs text-gray-500 text-center">
								You don&apos;t have any transactions
								yet
							</p>
						</div>
					) : (
						<ul className="space-y-2">
							{transactions.map((transaction) => (
								<li
									key={transaction.id}
									className="flex items-center justify-between gap-5 p-4 bg-base-200/95 rounded-box">
									<div className="flex items-center gap-5">
										<div>
											<p className="text-sm">
												{
													transaction.description
												}
											</p>
											<p className="text-xs text-gray-500">
												{new Date(
													transaction.updatedAt
												).toLocaleString(
													"en-GB",
													{
														day: "2-digit",
														month: "2-digit",
														year: "2-digit",
														hour: "2-digit",
														minute: "2-digit",
														hour12: true,
													}
												)}
											</p>
											<span className="badge badge-sm">
												{
													transaction.status
												}
											</span>
										</div>
									</div>
									<div>
										<p
											className={`text-sm ${transaction.status === "success" ? (transaction.type === "deposit" ? "text-success" : "text-error") : ""} `}>
											{transaction.type ===
											"deposit"
												? "+"
												: "-"}{" "}
											{commaNumber(
												transaction.amount
											)}
										</p>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
}

export default WalletPage;

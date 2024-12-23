import IconArrowLeft from "@/icons/arrow-left";

function ConfirmCodePage() {
	return (
		<div className="p-5">
			<header className="flex gap-4 items-center mb-10">
				<IconArrowLeft className="text-dark w-6 h-6" />
				<h1 className="text-center flex-1 sr-only">Register</h1>
			</header>
			<div className="text-center mb-16">
				<h2 className="text-center font-bold text-[32px] mb-[11px]">Cofirm Code</h2>
				<p>
					Enter the 6-digit code sent to <span className="block font-bold">+234-8161324564</span>
				</p>
			</div>

			<div className="flex items-center justify-center text-xs gap-2">
				<span>&bull;</span>
				<span>&bull;</span>
				<span className="mr-8">&bull;</span>
				<span>&bull;</span>
				<span>&bull;</span>
				<span>&bull;</span>
			</div>
		</div>
	);
}

export default ConfirmCodePage;

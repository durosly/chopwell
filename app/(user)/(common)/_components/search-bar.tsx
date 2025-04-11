"use client";
import IconSearchNormal from "@/icons/search-normal";
import { cn } from "@/utils/cn";
import Form from "next/form";
import { usePathname } from "next/navigation";
// import Link from "next/link";
import { useRef } from "react";

type PropType = {
	showSubmitBtn?: boolean;
	direction?: "row" | "column";
	inputClassName?: string;
	btnClassName?: string;
	parentClassName?: string;
	isHeader?: boolean;
};

function SearchBar({
	showSubmitBtn = false,
	direction,
	inputClassName,
	btnClassName,
	parentClassName,
	isHeader,
}: PropType) {
	const inputRef = useRef<HTMLInputElement>(null);
	const pathname = usePathname();

	if (!isHeader) {
		const exceptions = [
			"/cart",
			"/user/checkout",
			"/user",
			"/favourites",
			"/user/wallet",
			"/user/orders",
			"/user/account-details",
		];
		if (exceptions.includes(pathname)) return null;
	}

	return (
		<Form
			action={"/browse"}
			className={cn(
				"relative px-4 flex gap-2",
				{ "flex-col": direction === "column" },
				parentClassName
			)}>
			<label
				className={cn(
					"input relative border-[0.5px] border-[#797373] flex items-center gap-2 rounded-full",
					inputClassName
				)}>
				<IconSearchNormal className="h-5 w-5 opacity-70" />
				<input
					ref={inputRef}
					type="search"
					className="grow"
					name="query"
					placeholder="Search for product"
					autoComplete="off"
					required
				/>
				{/* suggestion dropdown */}
				{/* <div className="absolute top-12 left-0 bg-base-100 w-full p-2 border rounded-md shadow-box z-50">
					<ul>
						<li>
							<Link
								className="block w-full px-3 py-3 hover:bg-black/5"
								href="/browse">
								Nice to mee you again and to check
								if there is an overflow
							</Link>
						</li>
						<li>
							<Link
								className="block w-full px-3 py-3 hover:bg-black/5"
								href="/browse">
								Nice
							</Link>
						</li>
					</ul>
				</div> */}
			</label>
			{showSubmitBtn && (
				<button
					type="submit"
					className={cn("btn border-none btn-neutral", btnClassName)}>
					Search
				</button>
			)}
		</Form>
	);
}

export default SearchBar;

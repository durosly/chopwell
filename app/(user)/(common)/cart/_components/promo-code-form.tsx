import { cn } from "@/utils/cn";

type PropType = { parentClassName?: string | undefined };

function PromoCodeForm({ parentClassName }: PropType) {
	return (
		<form action="" className={cn("p-5 border-b", parentClassName)}>
			<div className="form-control mb-2">
				<label className="flex label" htmlFor="promo-code">
					<span className="label-text-alt">Promo Code</span>
				</label>
				<input
					type="text"
					name="promo-code"
					id="promo-code"
					className="input input-bordered"
				/>
			</div>
			<button className="btn btn-primary">Apply</button>
		</form>
	);
}

export default PromoCodeForm;

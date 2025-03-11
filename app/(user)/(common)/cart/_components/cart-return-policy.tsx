import Link from "next/link";

function CartReturnPolicy() {
	return (
		<>
			<h2 className="text-xl font-semibold">Returns</h2>
			<p className="text-xs text-gray-500">
				Learn more about our return policy{" "}
				<Link className="link" href="/return-policy">
					here
				</Link>
			</p>
		</>
	);
}

export default CartReturnPolicy;

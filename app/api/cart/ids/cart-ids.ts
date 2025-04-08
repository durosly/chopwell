import loadCartIdsAction from "@/actions/load-cart-ids-action";

async function loadCartIds() {
	try {
		const data = await loadCartIdsAction();

		if (!data) {
			return Response.json({ data: [] });
		}

		return Response.json({ message: "Food item added to cart", data });
	} catch (error) {
		console.log("Error in add-to-fav", error);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default loadCartIds;

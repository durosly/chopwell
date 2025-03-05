import getCartDataAction from "@/actions/get-cart-action";

async function getCartData() {
	try {
		const data = await getCartDataAction();

		if (data.status === false) {
			return Response.json({ message: data.message }, { status: 404 });
		}

		return Response.json(data.data, { status: 200 });
	} catch (error) {
		console.log("Error in add-to-fav", error);
		return Response.json({ message: "Something went wrong" }, { status: 500 });
	}
}

export default getCartData;

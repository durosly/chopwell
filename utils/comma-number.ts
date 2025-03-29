function commaNumber(number: number | string, params?: { currency?: "NGN" | "EUR"; style?: "currency" | "decimal" }): string {
	if (typeof Number(number) !== "number") return number.toString();

	const { currency = "NGN", style = "currency" } = params || {};
	return new Intl.NumberFormat("en-NG", {
		style,
		currency,
	}).format(Number(number));
}

export default commaNumber;

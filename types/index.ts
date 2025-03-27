export type UserType = "admin" | "employee" | "customer";

export type FormattedAddress = {
	_id: string;
	landmark: string;
	location: string;
	region: string;
	deliveryPrice: number;
	title: string;
};

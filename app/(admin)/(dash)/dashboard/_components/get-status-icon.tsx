import { LuClock } from "react-icons/lu";

import { LuCircleCheck } from "react-icons/lu";

import { LuLoader } from "react-icons/lu";

import { LuCircleX } from "react-icons/lu";

const getStatusIcon = (status: string) => {
	switch (status) {
		case "pending":
			return <LuClock className="w-3 h-3" />;
		case "preparing":
			return <LuLoader className="w-3 h-3 animate-spin" />;
		case "delivering":
			return <LuLoader className="w-3 h-3 animate-spin" />;
		case "successful":
			return <LuCircleCheck className="w-3 h-3" />;
		case "cancelled":
			return <LuCircleX className="w-3 h-3" />;
		default:
			return null;
	}
};

export default getStatusIcon;

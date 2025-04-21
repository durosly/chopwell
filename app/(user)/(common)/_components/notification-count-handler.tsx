"use client";

import { useState } from "react";

function NotificationCountHandler({ initialCount }: { initialCount: number }) {
	const [count] = useState(initialCount);
	return <span className="badge badge-primary">{count}</span>;
}

export default NotificationCountHandler;

"use client";

import { useState } from "react";

function NotificationCountHandler({ initialCount }: { initialCount: number }) {
	const [count, setCount] = useState(initialCount);
	return <span className="badge badge-primary">{count}</span>;
}

export default NotificationCountHandler;

export type TransactionStatus = "pending" | "success" | "failed";
export type TransactionType = "deposit" | "withdrawal" | "transfer";

export interface Transaction {
	_id: string;
	userId: string;
	type: TransactionType;
	amount: number;
	status: TransactionStatus;
	createdAt: string;
	user?: {
		name: string;
		email: string;
	};
}

export interface TransactionFilters {
	status?: TransactionStatus;
	type?: TransactionType;
	startDate: string;
	endDate: string;
}

export interface TransactionMetrics {
	totalTransactions: number;
	totalRevenue: number;
	pendingTransactions: number;
	failedTransactions: number;
}

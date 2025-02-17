"use server";

import "server-only";

import CategoryModel from "@/models/category";
import connectMongo from "@/lib/connectMongo";

type ParamType = {
	limit?: number;
	paginate?: boolean;
	page?: number;
};

async function getCategories({ limit, paginate = false, page }: ParamType) {
	await connectMongo();

	if (!paginate) {
		const categories = await CategoryModel.find({})
			.limit(limit || 0)
			.exec();

		return categories;
	} else {
		const categories = await CategoryModel.paginate(
			{},
			{ page: page || 1, limit: limit || 10 }
		);

		return categories;
	}
}

export default getCategories;

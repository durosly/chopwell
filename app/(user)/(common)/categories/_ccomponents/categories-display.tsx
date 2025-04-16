"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import Image from "next/image";

interface Subcategory {
	_id: string;
	name: string;
	cover_image: string;
}

interface Category {
	_id: string;
	name: string;
	cover_image: string;
	subcategories: Subcategory[];
}

interface CategoriesDisplayProps {
	categories: Category[];
}

function CategoriesDisplay({ categories }: CategoriesDisplayProps) {
	const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

	const toggleCategory = (categoryId: string) => {
		setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
	};
	return (
		<div className="space-y-4">
			{categories.map((category) => (
				<div
					key={category._id}
					className="bg-base-100 rounded-lg  overflow-hidden">
					<div className="flex">
						<Link
							href={`/browse?category=${category._id}`}
							className="flex-1 px-6 py-4 flex items-center hover:bg-gray-50 transition-colors">
							<div className="flex items-center space-x-4">
								<div className="relative size-12 rounded-full overflow-hidden bg-gray-200">
									<Image
										src={
											category.cover_image
										}
										alt={category.name}
										className="w-full h-full object-cover"
										fill
										sizes="48px"
									/>
								</div>
								<span className="text-lg font-medium text-gray-900">
									{category.name}
								</span>
							</div>
						</Link>
						{category.subcategories.length > 0 && (
							<button
								onClick={() =>
									toggleCategory(category._id)
								}
								className="px-6 py-4 hover:bg-gray-50 transition-colors"
								aria-label={
									expandedCategory ===
									category._id
										? "Collapse category"
										: "Expand category"
								}>
								{expandedCategory ===
								category._id ? (
									<LuChevronDown className="w-5 h-5 text-gray-500" />
								) : (
									<LuChevronRight className="w-5 h-5 text-gray-500" />
								)}
							</button>
						)}
					</div>

					{category.subcategories.length > 0 && (
						<AnimatePresence>
							{expandedCategory === category._id && (
								<motion.div
									initial={{
										height: 0,
										opacity: 0,
									}}
									animate={{
										height: "auto",
										opacity: 1,
									}}
									exit={{
										height: 0,
										opacity: 0,
									}}
									transition={{
										duration: 0.2,
									}}
									className="border-t border-gray-100">
									<div className="px-6 py-4">
										<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
											{category.subcategories.map(
												(
													subcategory
												) => (
													<Link
														key={
															subcategory._id
														}
														href={`/browse?category=${category._id}&sub-category=${subcategory._id}`}
														className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
														<div className="relative size-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
															<Image
																src={
																	subcategory.cover_image
																}
																alt={
																	subcategory.name
																}
																fill
																sizes="40px"
																className="object-cover"
															/>
														</div>
														{
															subcategory.name
														}
													</Link>
												)
											)}
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					)}
				</div>
			))}
		</div>
	);
}

export default CategoriesDisplay;

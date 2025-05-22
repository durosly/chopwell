import {
	LuInfo,
	LuUser,
	LuClipboardList,
	LuCookie,
	LuShare2,
	LuShield,
	LuMail,
} from "react-icons/lu";

function PrivacyPage() {
	return (
		<main className="container mx-auto max-w-2xl px-4 py-8">
			<div className="prose prose-neutral dark:prose-invert">
				{/* Introduction */}
				<section className="border-b border-base-200 pb-6 mb-8">
					<h1 className="flex items-center gap-2 text-3xl font-bold text-base-content mb-2">
						<LuInfo className="inline text-primary" size={28} />
						Privacy Policy
					</h1>
					<p className="text-lg text-base-content/80">
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit. Pellentesque euismod, urna eu tincidunt
						consectetur, nisi nisl aliquam nunc, eget aliquam
						massa nisl quis neque.
					</p>
				</section>

				{/* Information We Collect */}
				<section className="border-b border-base-200 pb-6 mb-8">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-2">
						<LuUser className="inline text-primary" size={22} />
						Information We Collect
					</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit. Etiam euismod, urna eu tincidunt consectetur,
						nisi nisl aliquam nunc, eget aliquam massa nisl quis
						neque.
					</p>
				</section>

				{/* How We Use Information */}
				<section className="border-b border-base-200 pb-6 mb-8">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-2">
						<LuClipboardList
							className="inline text-primary"
							size={22}
						/>
						How We Use Information
					</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit. Etiam euismod, urna eu tincidunt consectetur,
						nisi nisl aliquam nunc, eget aliquam massa nisl quis
						neque.
					</p>
				</section>

				{/* Cookies and Tracking */}
				<section className="border-b border-base-200 pb-6 mb-8">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-2">
						<LuCookie
							className="inline text-primary"
							size={22}
						/>
						Cookies and Tracking
					</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit. Etiam euismod, urna eu tincidunt consectetur,
						nisi nisl aliquam nunc, eget aliquam massa nisl quis
						neque.
					</p>
				</section>

				{/* Data Sharing */}
				<section className="border-b border-base-200 pb-6 mb-8">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-2">
						<LuShare2
							className="inline text-primary"
							size={22}
						/>
						Data Sharing
					</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit. Etiam euismod, urna eu tincidunt consectetur,
						nisi nisl aliquam nunc, eget aliquam massa nisl quis
						neque.
					</p>
				</section>

				{/* Your Rights */}
				<section className="border-b border-base-200 pb-6 mb-8">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-2">
						<LuShield
							className="inline text-primary"
							size={22}
						/>
						Your Rights
					</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit. Etiam euismod, urna eu tincidunt consectetur,
						nisi nisl aliquam nunc, eget aliquam massa nisl quis
						neque.
					</p>
				</section>

				{/* Contact Us */}
				<section className="pt-2">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-2">
						<LuMail className="inline text-primary" size={22} />
						Contact Us
					</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing
						elit. Etiam euismod, urna eu tincidunt consectetur,
						nisi nisl aliquam nunc, eget aliquam massa nisl quis
						neque.
					</p>
				</section>
			</div>
		</main>
	);
}

export default PrivacyPage;

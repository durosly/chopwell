import {
	LuBuilding,
	LuTarget,
	LuHeartHandshake,
	LuUsers,
	LuStar,
	LuCircleCheck,
} from "react-icons/lu";
import Image from "next/image";

const team = [
	{
		name: "Alex Johnson",
		role: "Founder & CEO",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		bio: "Visionary leader with a passion for innovation and people.",
	},
	{
		name: "Maria Chen",
		role: "Chief Technology Officer",
		avatar: "https://randomuser.me/api/portraits/women/44.jpg",
		bio: "Tech enthusiast driving our product and engineering teams.",
	},
	{
		name: "Samuel Lee",
		role: "Head of Design",
		avatar: "https://randomuser.me/api/portraits/men/65.jpg",
		bio: "Designing delightful experiences for our users.",
	},
	{
		name: "Priya Patel",
		role: "Marketing Lead",
		avatar: "https://randomuser.me/api/portraits/women/68.jpg",
		bio: "Connecting our brand with the world through creative campaigns.",
	},
];

const values = [
	{
		icon: LuHeartHandshake,
		title: "Integrity",
		desc: "We act with honesty, transparency, and respect in all we do.",
	},
	{
		icon: LuUsers,
		title: "Collaboration",
		desc: "We believe in the power of teamwork and open communication.",
	},
	{
		icon: LuStar,
		title: "Excellence",
		desc: "We strive for the highest standards in our products and service.",
	},
	{
		icon: LuCircleCheck,
		title: "Customer Focus",
		desc: "Our users are at the heart of every decision we make.",
	},
];

function AboutPage() {
	return (
		<main className="container mx-auto max-w-3xl px-4 py-10">
			<div className="prose prose-neutral dark:prose-invert max-w-none">
				{/* Company Overview */}
				<section className="border-b border-base-200 pb-8 mb-10">
					<h1 className="flex items-center gap-2 text-3xl font-bold text-base-content mb-2">
						<LuBuilding className="text-primary" size={28} />
						About Our Company
					</h1>
					<p className="text-lg text-base-content/80">
						We are a forward-thinking company dedicated to
						delivering exceptional digital experiences. Our team
						is passionate about building products that make a
						difference, foster community, and drive innovation
						in everything we do.
					</p>
				</section>

				{/* Our Mission */}
				<section className="border-b border-base-200 pb-8 mb-10">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-2">
						<LuTarget className="text-primary" size={22} />
						Our Mission
					</h2>
					<p>
						To empower individuals and organizations through
						intuitive, reliable, and impactful technology
						solutions that improve lives and create lasting
						value.
					</p>
				</section>

				{/* Our Values */}
				<section className="border-b border-base-200 pb-8 mb-10">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-4">
						<LuHeartHandshake
							className="text-primary"
							size={22}
						/>
						Our Values
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{values.map(({ icon: Icon, title, desc }) => (
							<div
								key={title}
								className="rounded-box border border-base-200 bg-base-100 p-5 flex items-start gap-3 transition-colors hover:border-primary/60">
								<Icon
									className="text-primary mt-1"
									size={24}
								/>
								<div>
									<h3 className="font-semibold text-lg mb-1">
										{title}
									</h3>
									<p className="text-base-content/80 text-sm">
										{desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Meet the Team */}
				<section className="border-b border-base-200 pb-8 mb-10">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-4">
						<LuUsers className="text-primary" size={22} />
						Meet the Team
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{team.map((member) => (
							<div
								key={member.name}
								className="rounded-box border border-base-200 bg-base-100 p-5 flex items-center gap-4 transition-shadow hover:border-primary/60">
								<div className="avatar">
									<div className="w-16 h-16 rounded-full border border-base-200 overflow-hidden">
										<Image
											src={
												member.avatar
											}
											alt={
												member.name
											}
											width={64}
											height={64}
											className="object-cover"
										/>
									</div>
								</div>
								<div>
									<h3 className="font-semibold text-lg mb-1">
										{member.name}
									</h3>
									<p className="text-primary text-sm font-medium mb-1">
										{member.role}
									</p>
									<p className="text-base-content/80 text-sm">
										{member.bio}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Why Choose Us */}
				<section className="pt-2">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-2">
						<LuStar className="text-primary" size={22} />
						Why Choose Us
					</h2>
					<ul className="list-disc pl-6 space-y-2 text-base-content/80">
						<li>Expert team with a proven track record</li>
						<li>Customer-centric approach in every project</li>
						<li>
							Commitment to quality, security, and
							innovation
						</li>
						<li>
							Transparent communication and reliable
							support
						</li>
					</ul>
				</section>
			</div>
		</main>
	);
}

export default AboutPage;

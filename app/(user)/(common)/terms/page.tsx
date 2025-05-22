import {
	LuBookOpen,
	LuUserCheck,
	LuShieldCheck,
	LuBan,
	LuPower,
	LuGavel,
	LuMail,
} from "react-icons/lu";

const sections = [
	{
		icon: LuBookOpen,
		title: "Introduction",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.",
	},
	{
		icon: LuUserCheck,
		title: "User Responsibilities",
		content: "Suspendisse potenti. Etiam ac mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus.",
	},
	{
		icon: LuShieldCheck,
		title: "Account Terms",
		content: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt.",
	},
	{
		icon: LuBan,
		title: "Prohibited Activities",
		content: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla quis lorem ut libero malesuada feugiat.",
	},
	{
		icon: LuPower,
		title: "Termination",
		content: "Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Proin eget tortor risus.",
	},
	{
		icon: LuGavel,
		title: "Governing Law",
		content: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada.",
	},
	{
		icon: LuMail,
		title: "Contact Information",
		content: "For any questions, please contact us at info@example.com. Pellentesque in ipsum id orci porta dapibus.",
	},
];

function TermsPage() {
	return (
		<div className="hero min-h-[60vh] py-10">
			<div className="container mx-auto px-4 max-w-3xl">
				<div className="card p-8 md:p-12">
					<div className="prose prose-neutral max-w-none mb-8 text-center">
						<h1 className="font-bold text-3xl md:text-4xl flex items-center justify-center gap-3">
							<LuBookOpen className="inline-block text-primary w-8 h-8 animate-fade-in" />
							Terms & Conditions
						</h1>
						<p className="text-base-content/70 mt-2">
							Please read these terms and conditions
							carefully before using our service.
						</p>
					</div>
					<div className="space-y-8">
						{sections.map(({ icon: Icon, title, content }) => (
							<div
								key={title}
								className="card bg-base-100 p-6 transition-all duration-200 group">
								<div className="flex items-center gap-3 mb-2">
									<Icon className="text-primary w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
									<h2 className="font-semibold text-xl md:text-2xl text-base-content">
										{title}
									</h2>
								</div>
								<p className="text-base-content/80 leading-relaxed">
									{content}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default TermsPage;

import {
	LuMail,
	LuPhone,
	LuMapPin,
	LuUser,
	LuMessageCircle,
	LuCircleHelp,
	LuBookOpen,
	LuSend,
	LuFileText,
} from "react-icons/lu";

function ContactPage() {
	return (
		<main className="container mx-auto max-w-2xl px-4 py-10">
			<div className="prose prose-neutral dark:prose-invert max-w-none">
				{/* Heading & Intro */}
				<section className="border-b border-base-200 pb-8 mb-10">
					<h1 className="flex items-center gap-2 text-3xl font-bold text-base-content mb-2">
						<LuMail className="text-primary" size={28} />
						Contact Us
					</h1>
					<p className="text-lg text-base-content/80">
						We&apos;d love to hear from you! Reach out with
						questions, feedback, or support needs. Our team will
						respond as soon as possible.
					</p>
				</section>

				{/* Contact Information */}
				<section className="border-b border-base-200 pb-8 mb-10">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-4">
						<LuBookOpen className="text-primary" size={22} />
						Contact Information
					</h2>
					<ul className="space-y-3">
						<li className="flex items-center gap-3">
							<LuMail
								className="text-primary"
								size={20}
							/>
							<span className="font-medium">Email:</span>
							<a
								href="mailto:support@example.com"
								className="link link-hover">
								support@example.com
							</a>
						</li>
						<li className="flex items-center gap-3">
							<LuPhone
								className="text-primary"
								size={20}
							/>
							<span className="font-medium">Phone:</span>
							<a
								href="tel:+1234567890"
								className="link link-hover">
								+1 (234) 567-890
							</a>
						</li>
						<li className="flex items-center gap-3">
							<LuMapPin
								className="text-primary"
								size={20}
							/>
							<span className="font-medium">
								Address:
							</span>
							<span>123 Main Street, City, Country</span>
						</li>
					</ul>
				</section>

				{/* Contact Form */}
				<section className="border-b border-base-200 pb-8 mb-10">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-4">
						<LuMessageCircle
							className="text-primary"
							size={22}
						/>
						Send Us a Message
					</h2>
					<form className="grid gap-5">
						<div className="form-control">
							<label
								className="label gap-2"
								htmlFor="name">
								<LuUser
									className="text-primary"
									size={18}
								/>
								<span className="label-text">
									Name
								</span>
							</label>
							<input
								id="name"
								type="text"
								placeholder="Your Name"
								className="input input-bordered w-full"
								autoComplete="name"
								required
							/>
						</div>
						<div className="form-control">
							<label
								className="label gap-2"
								htmlFor="email">
								<LuMail
									className="text-primary"
									size={18}
								/>
								<span className="label-text">
									Email
								</span>
							</label>
							<input
								id="email"
								type="email"
								placeholder="you@email.com"
								className="input input-bordered w-full"
								autoComplete="email"
								required
							/>
						</div>
						<div className="form-control">
							<label
								className="label gap-2"
								htmlFor="subject">
								<LuFileText
									className="text-primary"
									size={18}
								/>
								<span className="label-text">
									Subject
								</span>
							</label>
							<input
								id="subject"
								type="text"
								placeholder="Subject"
								className="input input-bordered w-full"
								required
							/>
						</div>
						<div className="form-control">
							<label
								className="label gap-2"
								htmlFor="message">
								<LuMessageCircle
									className="text-primary"
									size={18}
								/>
								<span className="label-text">
									Message
								</span>
							</label>
							<textarea
								id="message"
								placeholder="Type your message..."
								className="textarea textarea-bordered w-full min-h-[120px]"
								required
							/>
						</div>
						<button
							type="submit"
							className="btn btn-primary flex items-center gap-2 w-fit self-end"
							tabIndex={0}
							aria-label="Send message"
							disabled>
							<LuSend size={18} />
							Send Message
						</button>
					</form>
				</section>

				{/* FAQ Section */}
				<section className="pt-2">
					<h2 className="flex items-center gap-2 text-xl font-semibold text-base-content mb-4">
						<LuCircleHelp className="text-primary" size={22} />
						Frequently Asked Questions
					</h2>
					<div className="space-y-4">
						<details className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-box">
							<summary className="collapse-title font-medium text-base-content">
								How soon will I get a response?
							</summary>
							<div className="collapse-content text-base-content/80">
								We aim to respond to all inquiries
								within 1-2 business days.
							</div>
						</details>
						<details className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-box">
							<summary className="collapse-title font-medium text-base-content">
								Can I get support outside business
								hours?
							</summary>
							<div className="collapse-content text-base-content/80">
								Our support team is available Monday
								to Friday, 9am–5pm. For urgent
								issues, email us and we&apos;ll do
								our best to help.
							</div>
						</details>
						<details className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-box">
							<summary className="collapse-title font-medium text-base-content">
								Where can I find more help?
							</summary>
							<div className="collapse-content text-base-content/80">
								Visit our{" "}
								<a
									href="/help"
									className="link link-primary">
									Help Center
								</a>{" "}
								for more resources and guides.
							</div>
						</details>
					</div>
				</section>
			</div>
		</main>
	);
}

export default ContactPage;

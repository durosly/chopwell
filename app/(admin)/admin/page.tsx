import LoginForm from "./_components/login-form";

function AdminLoginPage() {
	return (
		<div className="hero bg-base-200 min-h-screen">
			<div className="hero-content flex-col">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Login now!</h1>
				</div>
				<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
					<LoginForm />
				</div>
			</div>
		</div>
	);
}

export default AdminLoginPage;

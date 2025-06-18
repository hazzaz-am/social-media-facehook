import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { cn } from "../../lib/cn";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	const submitForm = (formState) => {
		const user = { ...formState };
		setAuth({ user });
		navigate("/");
		console.log(formState);
	};

	return (
		<form
			onSubmit={handleSubmit(submitForm)}
			className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
		>
			<Field label="Email" error={errors.email}>
				<input
					type="email"
					name="email"
					id="email"
					className={cn(
						"auth-input",
						errors.email ? "border-red-600 bg-red-400/5" : "border-gray-600"
					)}
					{...register("email", {
						required: "Email is required",
					})}
				/>
			</Field>
			<Field label="Password" error={errors.password}>
				<input
					type="password"
					name="password"
					id="password"
					className={cn(
						"auth-input",
						errors.password ? "border-red-600 bg-red-400/5" : "border-gray-600"
					)}
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 8,
							message: "Your password must be at least 8 characters",
						},
					})}
				/>
			</Field>
			<Field>
				<button
					className="auth-input bg-lws-green font-bold text-deep-dark transition-all hover:opacity-90 cursor-pointer"
					type="submit"
				>
					Login
				</button>
			</Field>
		</form>
	);
}

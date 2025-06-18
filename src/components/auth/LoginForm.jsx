import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { cn } from "../../lib/cn";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import axios from "axios";

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	const submitForm = async (formState) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
				formState
			);

			if (response.status === 200) {
				const { token: responseToken, user } = response.data;
				if (responseToken) {
					const authToken = responseToken.token;
					const refreshToken = responseToken.refreshToken;
					setAuth({ user, authToken, refreshToken });
					navigate("/");
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
				setError("root.random", {
					type: "random",
					message: error?.response?.data?.error || error?.message,
				});
			} else {
				setError("root.random", {
					type: "random",
					message: `Internal Error`,
				});
			}
		}
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
			{errors?.root?.random?.message && (
				<div className="my-2.5 p-2.5 text-red-600 bg-red-400/5 rounded-md">
					{errors?.root?.random?.message}
				</div>
			)}
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

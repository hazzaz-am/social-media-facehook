import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";

export default function App() {
	return (
		<Routes>
			{/* Protected Routes */}
			<Route element={<ProtectedRoutes />}>
				<Route path="/" element={<HomePage />} exact />
				<Route path="/me" element={<ProfilePage />} />
			</Route>

			{/* Auth Routes */}
			<Route path="/login" element={<LoginPage />} />
			<Route path="/registration" element={<RegisterPage />} />

			{/* Not Found Page */}
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

import { Link } from "react-router";
import logo from "../../assets/images/logo.svg";
import homeIcon from "../../assets/icons/home.svg";
import notificationIcon from "../../assets/icons/notification.svg";
import Logout from "../auth/Logout";
import { useAuth } from "../../hooks/useAuth";
import { useProfileData } from "../../hooks/useProfileData";

export default function Navbar() {
	const { auth } = useAuth();
	const { profileState } = useProfileData();

	const user = profileState?.user ?? auth?.user;
	return (
		<nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
			<div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
				<Link to="/">
					<img
						className="max-w-[100px] rounded-full lg:max-w-[130px]"
						src={logo}
					/>
				</Link>

				<div className="flex items-center space-x-4">
					<Link to="/" className="btn-primary">
						<img src={homeIcon} alt="Home" />
						Home
					</Link>
					<button className="icon-btn">
						<img src={notificationIcon} alt="Notification" />
					</button>
					<Logout />

					<button className="flex-center !ml-8 gap-3">
						<span className="text-lg font-medium lg:text-xl">
							{user?.firstName}
						</span>
						<img
							className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px] rounded-full"
							src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
							alt="user-image"
						/>
					</button>
				</div>

			</div>
		</nav>
	);
}

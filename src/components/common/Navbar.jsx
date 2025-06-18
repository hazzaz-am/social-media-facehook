import { Link } from "react-router";
import logo from "../../assets/images/logo.svg"
import homeIcon from "../../assets/icons/home.svg"
import notificationIcon from "../../assets/icons/notification.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import avatarIcon from "../../assets/images/avatars/avatar_1.png";

export default function Navbar() {
	return (
		<nav class="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
			<div class="container flex flex-col items-center justify-between gap-6 sm:flex-row">
				{/* <!-- Logo --> */}
				<Link to="/">
					<img
						class="max-w-[100px] rounded-full lg:max-w-[130px]"
						src={logo}
					/>
				</Link>
				{/* <!-- nav links  --> */}

				<div class="flex items-center space-x-4">
					<Link to="/" class="btn-primary">
						<img src={homeIcon} alt="Home" />
						Home
					</Link>
					<button class="icon-btn">
						<img src={notificationIcon} alt="Notification" />
					</button>
					<button class="icon-btn">
						<img src={logoutIcon} alt="Logout" />
					</button>

					<button class="flex-center !ml-8 gap-3">
						<span class="text-lg font-medium lg:text-xl">Sumit</span>
						<img
							class="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
							src={avatarIcon}
							alt="user-image"
						/>
					</button>
				</div>
				{/* <!-- nav links ends --> */}
			</div>
		</nav>
	);
}

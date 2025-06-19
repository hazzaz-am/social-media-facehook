import Bio from "./Bio";
import ProfileImage from "./ProfileImage";
import { useProfileData } from "../../hooks/useProfileData";

export default function ProfileInfo() {
	const { profileState } = useProfileData();
	return (
		<div className="flex flex-col items-center py-8 text-center">
			<ProfileImage />
			<div>
				<h3 className="text-2xl font-semibold text-white lg:text-[28px]">
					{profileState?.user?.firstName} {profileState?.user?.lastName}
				</h3>
				<p className="leading-[231%] lg:text-lg">{profileState?.user?.email}</p>
			</div>
			<Bio />
			<div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
		</div>
	);
}

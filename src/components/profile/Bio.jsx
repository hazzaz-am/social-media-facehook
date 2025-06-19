import { useState } from "react";
import editIcon from "../../assets/icons/edit.svg";
import checkIcon from "../../assets/icons/check.svg";
import { useProfileData } from "../../hooks/useProfileData";
import { actions } from "../../actions";
import { useAxiosInterceptor } from "../../hooks/useAxiosInterceptor";

export default function Bio() {
	const { profileState, dispatchProfile } = useProfileData();
	const [bio, setBio] = useState(profileState?.user?.bio);
	const [editMode, setEditMode] = useState(false);
	const { api } = useAxiosInterceptor();

	const handleSaveBio = async () => {
		dispatchProfile({ type: actions.profile.DATA_FETCHING });

		try {
			const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${profileState?.user?.id}`, { bio })

			if (response.status === 200) {
				dispatchProfile({
					type: actions.profile.USER_DATA_UPDATED,
					payload: response.data
				})
			}
			setEditMode(false);
		} catch (error) {
			console.log(error)
			dispatchProfile({
				type: actions.profile.DATA_FETCH_ERROR,
				payload: error.message,
			});
		}
	}

	return (
		<div className="mt-4 flex items-start gap-2 lg:mt-6">
			<div className="flex-1">
				{
					editMode ? (
						<textarea
							className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md border'
							value={bio}
							rows={4}
							cols={55}
							onChange={(e) => setBio(e.target.value)}
						/>
					) : (
						<p className="leading-[188%] text-gray-400 lg:text-lg">
							{bio}
						</p>
					)
				}
			</div>
			{
				editMode ? (
					<button title="Save Bio" onClick={handleSaveBio} className="flex-center h-7 w-7 rounded-full cursor-pointer">
						<img src={checkIcon} alt="Edit" title="Save Bio" />
					</button>
				) : (
					<button title="Edit Bio" onClick={() => setEditMode(true)} className="flex-center h-7 w-7 rounded-full cursor-pointer">
						<img src={editIcon} alt="Edit" title="Edit Bio" />
					</button>
				)
			}
		</div>
	);
}

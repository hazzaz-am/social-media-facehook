import { useRef } from "react";
import editIcon from "../../assets/icons/edit.svg";
import { useProfileData } from "../../hooks/useProfileData";
import { actions } from "../../actions";
import { useAxiosInterceptor } from "../../hooks/useAxiosInterceptor";

export default function ProfileImage() {
	const { profileState, dispatchProfile } = useProfileData();
	const avatarRef = useRef(null);
	const { api } = useAxiosInterceptor()

	const handleUploadAvatar = async (e) => {
		e.preventDefault()
		avatarRef.current.click()
		avatarRef.current.addEventListener("change", updateImageDisplay);
	}

	const updateImageDisplay = async () => {
		try {
			const formData = new FormData()

			for (const file of avatarRef.current.files) {
				formData.append("avatar", file)
			}

			const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${profileState?.user?.id}/avatar`, formData)

			if (response.status === 200) {
				dispatchProfile({
					type: actions.profile.IMAGE_UPDATED,
					payload: response.data
				})
			}

		} catch (error) {
			console.log(error)
			dispatchProfile({
				type: actions.profile.DATA_FETCH_ERROR,
				payload: error.message
			})
		}
	}

	return (
		<div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
			<img
				className="max-w-full"
				src={`${import.meta.env.VITE_SERVER_BASE_URL}/${profileState?.user?.avatar}`}
				alt={profileState?.user?.firstName}
			/>

			<form id="form" encType="multipart/form-data">
				<button onClick={handleUploadAvatar} title="Upload Image" className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80 cursor-pointer" type="submit">
					<img src={editIcon} alt="Upload Image" />
				</button>
				<input ref={avatarRef} type="file" name="avatar" id="avatar" className="hidden" />
			</form>
		</div>
	);
}

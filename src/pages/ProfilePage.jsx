import { useEffect } from "react";
import { useAxiosInterceptor } from "../hooks/useAxiosInterceptor";
import { useAuth } from "../hooks/useAuth";
import ProfileInfo from "../components/profile/ProfileInfo";
import Post from "../components/profile/Post";
import { actions } from "../actions";
import { useProfileData } from "../hooks/useProfileData";

export default function ProfilePage() {
	const { profileState, dispatchProfile } = useProfileData();
	const { api } = useAxiosInterceptor();
	const { auth } = useAuth();

	useEffect(() => {
		dispatchProfile({
			type: actions.profile.DATA_FETCHING,
		});
		const getUserProfile = async () => {
			try {
				const response = await api.get(
					`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
				);

				if (response.status === 200) {
					dispatchProfile({
						type: actions.profile.DATA_FETCHED,
						payload: response?.data,
					});
				}
			} catch (error) {
				console.log(error);
				dispatchProfile({
					type: actions.profile.DATA_FETCH_ERROR,
					payload: error.message,
				});
			}
		};

		getUserProfile();
	}, [api, auth?.user?.id, dispatchProfile]);

	if (profileState?.loading) {
		return (
			<div className="min-h-screen flex items-center justify-center text-2xl text-lws-green">
				Loading ....
			</div>
		);
	}

	return (
		<div>
			{profileState?.user && (
				<>
					<ProfileInfo />
					<h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
					{profileState?.posts && profileState?.posts.map((post) => <Post key={post.id} />)}
				</>
			)}
			{profileState?.error && (
				<p className="text-red-600 bg-red-400/5 p-2.5 rounded-md">
					Your data not found. Try again or{" "}
					<b>
						<i>Login.</i>
					</b>
				</p>
			)}
		</div>
	);
}

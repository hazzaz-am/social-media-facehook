import { useEffect } from "react";
import { useState } from "react";
import { useAxiosInterceptor } from "../hooks/useAxiosInterceptor";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { api } = useAxiosInterceptor();
	const { auth } = useAuth();

	useEffect(() => {
		const getUserProfile = async () => {
			try {
				const response = await api.get(
					`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
				);

				if (response.status === 200) {
					setUser(response?.data?.user);
					setPosts(response?.data?.posts);
				}
			} catch (error) {
				console.log(error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		getUserProfile();
	}, [api, auth?.user?.id]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center text-2xl text-lws-green">
				Loading ....
			</div>
		);
	}

	return (
		<div>
			{user && <p>{user.firstName}</p>}
			{posts && posts.map((post) => <p key={post.id}>{post.content}</p>)}
			{error && (
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

import { Link } from "react-router";

export default function HomePage() {
	return (
		<div>
			Homepage
			<Link to="/me">Profile</Link>
		</div>
	);
}

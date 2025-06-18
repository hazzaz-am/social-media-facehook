import { useContext } from "react";
import { AuthContext } from "../contexts";
import { useDebugValue } from "react";

export function useAuth() {
	const { auth } = useContext(AuthContext);
	useDebugValue(auth, (auth) =>
		auth?.user ? "user logged in" : "user logged out"
	);
	return useContext(AuthContext);
}

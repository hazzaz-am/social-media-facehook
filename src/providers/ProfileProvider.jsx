import { useReducer } from "react";
import { ProfileContext } from "../contexts";
import { initialState, profileReducer } from "../reducers/profileReducer";

export default function ProfileProvider({ children }) {
	const [profileState, dispatchProfile] = useReducer(
		profileReducer,
		initialState
	);

	return (
		<ProfileContext.Provider value={{ profileState, dispatchProfile }}>
			{children}
		</ProfileContext.Provider>
	);
}

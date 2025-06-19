import { useContext } from "react";
import { ProfileContext } from "../contexts";

export function useProfileData() {
	return useContext(ProfileContext);
}

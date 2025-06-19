import { actions } from "../actions";

const initialState = {
	user: null,
	posts: null,
	loading: false,
	error: null,
};

const profileReducer = (state, action) => {
	switch (action.type) {
		case actions.profile.DATA_FETCHING: {
			return {
				...state,
				loading: true,
			};
		}

		case actions.profile.DATA_FETCHED: {
			return {
				...state,
				loading: false,
				user: action.payload.user,
				posts: action.payload.posts,
			};
		}

		case actions.profile.DATA_FETCH_ERROR: {
			return {
				...state,
				loading: false,
				error: action.payload.error,
			};
		}

		case actions.profile.USER_DATA_UPDATED: {
			return {
				...state,
				loading: false,
				user: action.payload,
			};
		}

		case actions.profile.IMAGE_UPDATED: {
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					avatar: action.payload.avatar
				}
			}
		}

		default:
			return state;
	}
};

export { initialState, profileReducer };

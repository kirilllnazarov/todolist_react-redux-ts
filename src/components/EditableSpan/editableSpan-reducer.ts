type StateModeType = {
	visibleInput: boolean;
};
type SetTrueActionType = {
	type: "SET_TRUE";
};
type SetFalseActionType = {
	type: "SET_FALSE";
};

type ActionModeType = SetTrueActionType | SetFalseActionType;

export const modeReducer = (state: StateModeType, action: ActionModeType): StateModeType => {
	switch (action.type) {
		case "SET_TRUE":
			return { ...state, visibleInput: true };
		case "SET_FALSE":
			return { ...state, visibleInput: false };
		default:
			return state;
	}
};

type StateTitleType = {
	title: string;
};
type ActionTitleType = {
	type: "SET_NEW_TITLE";
	payload: {
		eventValue: string;
	};
};

export const titleReducer = (state: StateTitleType, action: ActionTitleType): StateTitleType => {
	switch (action.type) {
		case "SET_NEW_TITLE":
			return { ...state, title: action.payload.eventValue };
		default:
			return state;
	}
};

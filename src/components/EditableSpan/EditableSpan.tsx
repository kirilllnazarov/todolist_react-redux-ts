import { ChangeEvent, useReducer, useState } from "react";
import { modeReducer, titleReducer } from "./editableSpan-reducer";

type Type = {
	title: string;
	updateTitle: (title: string) => void;
};

export const EditableSpan = ({ title, updateTitle }: Type) => {
	const [editMode, dispatchEditMode] = useReducer(modeReducer, { visibleInput: false });
	const [newTitle, dispatchNewTitle] = useReducer(titleReducer, { title: title });

	const onBlurHandler = () => {
		dispatchEditMode({ type: "SET_FALSE" });
		updateTitle(newTitle.title);
	};
	const onDoubleClickHandler = () => {
		dispatchEditMode({ type: "SET_TRUE" });
	};
	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const eventValue = event.currentTarget.value;
		dispatchNewTitle({ type: "SET_NEW_TITLE", payload: { eventValue } });
	};

	return editMode.visibleInput ? (
		<input value={newTitle.title} onBlur={onBlurHandler} onChange={onChangeHandler} autoFocus />
	) : (
		<span onDoubleClick={onDoubleClickHandler}>{title}</span>
	);
};

import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../app/App";

const initState: TodolistType[] = []

export const todolistsReducer = (todolists: TodolistType[] = initState, action: ActionType): TodolistType[] => {
	switch (action.type) {
		case "ADD_TODOLIST": {
			return [...todolists, { id: action.payload.newTodolistId, title: action.payload.todolistTitle, filter: "all" }];
		}
		case "REMOVE_TODOLIST": {
			return todolists.filter((todolist) => todolist.id !== action.payload.todolistId);
		}
		case "REMOVE_ALL_TODOLISTS": {
			return [];
		}
		case "UPDATE_TODOLIST": {
			return todolists.map((todolist) =>
				todolist.id === action.payload.todolistId ? { ...todolist, title: action.payload.title } : todolist
			);
		}
		case "CHANGE_FILTER_TODOLIST": {
			return todolists.map((todolist) =>
				todolist.id === action.payload.todolistId ? { ...todolist, filter: action.payload.newFilter } : todolist
			);
		}
		default:
			return todolists;
	}
};

export const addTodolistAC = (todolistTitle: string) => {
	return {
		type: "ADD_TODOLIST",
		payload: { todolistTitle, newTodolistId: v1() },
	} as const;
};

export const removeTodolistAC = (todolistId: string) => {
	return {
		type: "REMOVE_TODOLIST",
		payload: {
			todolistId,
		},
	} as const;
};

export const removeAllTodolistsAC = () => {
	return {
		type: "REMOVE_ALL_TODOLISTS",
	} as const;
};

export const updateTodolistAC = (payload: { todolistId: string; title: string }) => {
	return {
		type: "UPDATE_TODOLIST",
		payload,
	} as const;
};

export const changeFilterTodolistAC = (payload: { todolistId: string; newFilter: FilterValuesType }) => {
	return {
		type: "CHANGE_FILTER_TODOLIST",
		payload,
	} as const;
};

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;

export type RemoveAllTodolistsActionType = ReturnType<typeof removeAllTodolistsAC>;

export type UpdateTodolistActionType = ReturnType<typeof updateTodolistAC>;

export type ChangeFilterTodolistActionType = ReturnType<typeof changeFilterTodolistAC>;

type ActionType =
	| AddTodolistActionType
	| RemoveTodolistActionType
	| RemoveAllTodolistsActionType
	| UpdateTodolistActionType
	| ChangeFilterTodolistActionType;

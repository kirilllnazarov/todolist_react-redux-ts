import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
import { TasksStateType } from "../app/App";

const initState: TasksStateType = {};

export const tasksReducer = (tasks: TasksStateType = initState, action: ActionType): TasksStateType => {
	switch (action.type) {
		case "ADD_TASK":
			return {
				...tasks,
				[action.payload.todolistId]: [
					{ id: v1(), title: action.payload.title, isDone: false },
					...tasks[action.payload.todolistId],
				],
			};
		case "REMOVE_TASK":
			return {
				...tasks,
				[action.payload.todolistId]: tasks[action.payload.todolistId].filter(
					(task) => task.id !== action.payload.taskId
				),
			};
		case "REMOVE_ALL_TASK":
			return { ...tasks, [action.payload.todolistId]: [] };
		case "CHANGE_TASK_STATUS":
			return {
				...tasks,
				[action.payload.todolistId]: tasks[action.payload.todolistId].map((task) =>
					task.id === action.payload.taskId ? { ...task, isDone: action.payload.newTaskStatus } : task
				),
			};
		case "UPDATE_TASK":
			return {
				...tasks,
				[action.payload.todolistId]: tasks[action.payload.todolistId].map((task) =>
					task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task
				),
			};
		case "REMOVE_TODOLIST":
			let copyState = { ...tasks };
			delete copyState[action.payload.todolistId];
			return copyState;

		case "ADD_TODOLIST":
			return { ...tasks, [action.payload.newTodolistId]: [] };
		default:
			return tasks;
	}
};

export const AddTaskAC = (payload: { todolistId: string; title: string }) => {
	return {
		type: "ADD_TASK",
		payload,
	} as const;
};

export const RemoveTaskAC = (payload: { todolistId: string; taskId: string }) => {
	return {
		type: "REMOVE_TASK",
		payload,
	} as const;
};

export const RemoveAllTasksAC = (payload: { todolistId: string }) => {
	return {
		type: "REMOVE_ALL_TASK",
		payload,
	} as const;
};

export const ChangeTaskStatusAC = (payload: { todolistId: string; taskId: string; newTaskStatus: boolean }) => {
	return {
		type: "CHANGE_TASK_STATUS",
		payload,
	} as const;
};

export const UpdateTaskAC = (payload: { todolistId: string; taskId: string; title: string }) => {
	return {
		type: "UPDATE_TASK",
		payload,
	} as const;
};

type AddTaskAT = ReturnType<typeof AddTaskAC>;

type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>;

type RemoveAllTasksAT = ReturnType<typeof RemoveAllTasksAC>;

type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>;

type UpdateTaskAT = ReturnType<typeof UpdateTaskAC>;

type ActionType =
	| AddTaskAT
	| RemoveTaskAT
	| RemoveAllTasksAT
	| ChangeTaskStatusAT
	| UpdateTaskAT
	| RemoveTodolistActionType
	| AddTodolistActionType;

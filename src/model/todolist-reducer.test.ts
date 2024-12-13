import { TodolistType } from "../app/App";
import {
	addTodolistAC,
	changeFilterTodolistAC,
	removeAllTodolistsAC,
	removeTodolistAC,
	todolistsReducer,
	updateTodolistAC,
} from "./todolists-reducer";

let startState: TodolistType[] = [];

beforeEach(() => {
	startState = [
		{ id: "todolistID1", title: "What to learn", filter: "all" },
		{ id: "todolistID2", title: "What to buy", filter: "all" },
	];
});

test("add todolist test", () => {
	const endstate = todolistsReducer(startState, addTodolistAC("What a fuck"));
	expect(startState.length).toBe(2);
	expect(endstate.length).toBe(3);
	expect(endstate[2].id).toBeDefined();
	expect(endstate[2].title).toBe("What a fuck");
});

test("remove todolist test", () => {
	const endState = todolistsReducer(startState, removeTodolistAC("todolistID1"));
	expect(startState.length).toBe(2);
	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe("todolistID2");
});

test("remove all todolists test", () => {
	const endState = todolistsReducer(startState, removeAllTodolistsAC());
	expect(startState.length).toBe(2);
	expect(endState).toHaveLength(0);
});

test("update todolist test", () => {
	const action = updateTodolistAC({ todolistId: "todolistID1", title: "What a fuck" });
	const endState = todolistsReducer(startState, action);
	expect(endState).toHaveLength(2);
	expect(startState[0].title).toBe("What to learn");
	expect(endState[0].title).toBe("What a fuck");
});

test("change filter todolist test", () => {
	const action = changeFilterTodolistAC({ todolistId: "todolistID2", newFilter: "completed" });
	const endState = todolistsReducer(startState, action);
	expect(startState[1].filter).toBe("all");
	expect(endState[1].filter).toBe("completed");
});

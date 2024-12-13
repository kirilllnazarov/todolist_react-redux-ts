import { TasksStateType } from "../app/App";
import {
	AddTaskAC,
	ChangeTaskStatusAC,
	RemoveAllTasksAC,
	RemoveTaskAC,
	tasksReducer,
	UpdateTaskAC,
} from "./tasks-reducer";

let startState: TasksStateType = {};

beforeEach(() => {
	startState = {
		["todolistID1"]: [
			{ id: "1", title: "HTML&CSS", isDone: true },
			{ id: "2", title: "JS", isDone: true },
			{ id: "3", title: "ReactJS", isDone: false },
		],
		["todolistID2"]: [
			{ id: "1", title: "Rest API", isDone: true },
			{ id: "2", title: "GraphQL", isDone: false },
			{ id: "3", title: "Redux", isDone: false },
		],
	};
});

test("change task status state test", () => {
	const action = ChangeTaskStatusAC({ todolistId: "todolistID2", taskId: "3", newTaskStatus: true });
	const endState = tasksReducer(startState, action);
	expect(endState["todolistID2"][2].isDone).toBeTruthy();
});

test("add task in todolist test", () => {
	const endState = tasksReducer(startState, AddTaskAC({ todolistId: "todolistID1", title: "NODE" }));
	expect(startState["todolistID1"][0].title).toBe("HTML&CSS");
	expect(endState["todolistID1"][0].title).toBe("NODE");
	expect(endState["todolistID1"][0].id).toBeDefined;
});

test("remove task test", () => {
	const endState = tasksReducer(startState, RemoveTaskAC({ todolistId: "todolistID2", taskId: "2" }));
	expect(endState["todolistID2"]).toHaveLength(2);
	expect(endState["todolistID1"]).toHaveLength(3);
	expect(endState["todolistID2"][1].id).toBe("3");
});

test("remove all task test", () => {
	const endState = tasksReducer(startState, RemoveAllTasksAC({ todolistId: "todolistID1" }));

	expect(startState["todolistID1"]).toBeDefined();
	expect(startState["todolistID1"]).toHaveLength(3);
	expect(endState["todolistID1"]).toHaveLength(0);
});

test("update task test", () => {
	const endState = tasksReducer(startState, UpdateTaskAC({ todolistId: "todolistID2", taskId: "3", title: "Red" }));
	expect(endState["todolistID2"][2].title).toBe("Red");
});

import s from "../styles/todolist.module.css";
import { Input } from "../components/Input/Input";
import { Todolist } from "../components/Todolist";
import { Button } from "../components/Button/Button";
import { useAppDispatch, useAppSelector } from "./hooks";
import { RootState } from "./store";
import {
	addTodolistAC,
	changeFilterTodolistAC,
	removeAllTodolistsAC,
	removeTodolistAC,
	updateTodolistAC,
} from "../model/todolists-reducer";
import {
	AddTaskAC,
	ChangeTaskStatusAC,
	RemoveAllTasksAC,
	RemoveTaskAC,
	UpdateTaskAC,
} from "../model/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
	id: string;
	title: string;
	filter: FilterValuesType;
};

export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
};

export type TasksStateType = {
	[key: string]: TaskType[];
};

const selectTodolists = (state: RootState): TodolistType[] => state.todolists;
const selectTasks = (state: RootState): TasksStateType => state.tasks;

function App() {
	const todolists = useAppSelector(selectTodolists);
	const tasks = useAppSelector(selectTasks);

	const dispatch = useAppDispatch();

	// function for change todolists
	const addTodolist = (todolistTitle: string) => {
		dispatch(addTodolistAC(todolistTitle));
	};

	const removeTodolist = (todolistId: string) => {
		dispatch(removeTodolistAC(todolistId));
	};

	const removeAllTodolist = () => {
		dispatch(removeAllTodolistsAC());
	};

	const updateTodolist = (todolistId: string, title: string) => {
		dispatch(updateTodolistAC({ todolistId, title }));
	};

	const changeFilterTodolist = (todolistId: string, newFilter: FilterValuesType) => {
		dispatch(changeFilterTodolistAC({ todolistId, newFilter }));
	};

	// function for change tasks
	const addTask = (payload: { todolistId: string; title: string }) => {
		const { todolistId, title } = payload;
		dispatch(AddTaskAC({ todolistId, title }));
	};

	const removeTask = (payload: { todolistId: string; taskId: string }) => {
		const { todolistId, taskId } = payload;
		dispatch(RemoveTaskAC({ todolistId, taskId }));
	};

	const removeAllTasks = (payload: { todolistId: string }) => {
		const { todolistId } = payload;
		dispatch(RemoveAllTasksAC({ todolistId }));
	};

	const changeTaskStatus = (payload: { todolistId: string; taskId: string; newTaskStatus: boolean }) => {
		const { todolistId, taskId, newTaskStatus } = payload;
		dispatch(ChangeTaskStatusAC({ todolistId, taskId, newTaskStatus }));
	};

	const updateTask = (payload: { todolistId: string; taskId: string; title: string }) => {
		const { todolistId, taskId, title } = payload;
		dispatch(UpdateTaskAC({ todolistId, taskId, title }));
	};

	return (
		<>
			<div className={s.todolistCreate}>
				<Input addItemFromInput={addTodolist} />
				<Button onClick={removeAllTodolist}>delete all todolist</Button>
			</div>

			<div className={s.block}>
				{todolists.map((todolist) => {
					let tasksForTodolist = tasks[todolist.id];

					if (todolist.filter === "active") {
						tasksForTodolist = tasks[todolist.id].filter((task) => !task.isDone);
					}

					if (todolist.filter === "completed") {
						tasksForTodolist = tasks[todolist.id].filter((task) => task.isDone);
					}
					return (
						<Todolist
							key={todolist.id}
							todolistId={todolist.id}
							todolistTitle={todolist.title}
							tasks={tasksForTodolist}
							removeTodolist={removeTodolist}
							addTask={addTask}
							removeTask={removeTask}
							removeAllTasks={removeAllTasks}
							changeTaskStatus={changeTaskStatus}
							changeFilterTodolist={changeFilterTodolist}
							updateTodolist={updateTodolist}
							updateTask={updateTask}
						/>
					);
				})}
			</div>
		</>
	);
}

export default App;

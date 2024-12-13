import { ChangeEvent } from "react";
import { FilterValuesType, TaskType } from "../app/App";
import { Input } from "./Input/Input";
import { Button } from "./Button/Button";
import { Checkbox } from "./Checkbox/Checkbox";
import s from "../styles/todolist.module.css";
import { EditableSpan } from "./EditableSpan/EditableSpan";

type Type = {
	todolistId: string;
	todolistTitle: string;
	tasks: TaskType[];
	removeTodolist: (todolistId: string) => void;
	addTask: (payload: { todolistId: string; title: string }) => void;
	removeTask: (payload: { todolistId: string; taskId: string }) => void;
	removeAllTasks: (payload: { todolistId: string }) => void;
	changeTaskStatus: (payload: { todolistId: string; taskId: string; newTaskStatus: boolean }) => void;
	changeFilterTodolist: (todolistId: string, newFilter: FilterValuesType) => void;
	updateTodolist: (todolistId: string, title: string) => void;
	updateTask: (payload: { todolistId: string; taskId: string; title: string }) => void;
};

export const Todolist = (props: Type) => {
	const {
		todolistId,
		todolistTitle,
		tasks,
		removeTodolist,
		addTask,
		removeTask,
		removeAllTasks,
		changeTaskStatus,
		changeFilterTodolist,
		updateTodolist,
		updateTask,
	} = props;

	const removeTodolistHandler = () => {
		removeTodolist(todolistId);
	};

	const removeTaskHandler = (taskId: string) => {
		removeTask({ todolistId, taskId });
	};

	const removeAllTasksHandler = () => {
		removeAllTasks({ todolistId });
	};
	const changeTaskStatusHandler = (taskId: string, event: ChangeEvent<HTMLInputElement>) => {
		const newTaskStatus = event.currentTarget.checked;
		changeTaskStatus({ todolistId, taskId, newTaskStatus });
	};

	const changeFilterTodolistHandler = (newFilter: FilterValuesType) => {
		changeFilterTodolist(todolistId, newFilter);
	};

	const updateTodolistTitleHandler = (title: string) => {
		updateTodolist(todolistId, title);
	};
	const updateTaskTitleHandler = (taskId: string, title: string) => {
		updateTask({ todolistId, taskId, title });
	};

	return (
		<div className={s.todolist}>
			<div className={s.title}>
				<EditableSpan title={todolistTitle} updateTitle={updateTodolistTitleHandler} />
				<Button onClick={removeTodolistHandler}>delete todolist</Button>
			</div>

			{/* добавление таски */}
			<div>
				<Input addItemFromInput={(title) => addTask({ todolistId, title })} />
			</div>

			<Button onClick={removeAllTasksHandler}>delete all tasks</Button>

			{/* создаем таски в тудултсте*/}
			{!tasks.length ? (
				<span>Тасок нет!</span>
			) : (
				<ul>
					{tasks.map((task) => {
						return (
							<li key={task.id} className={s.task}>
								<Checkbox checked={task.isDone} onChange={(event) => changeTaskStatusHandler(task.id, event)} />
								<EditableSpan title={task.title} updateTitle={(title) => updateTaskTitleHandler(task.id, title)} />
								<Button onClick={() => removeTaskHandler(task.id)}>❌</Button>
							</li>
						);
					})}
				</ul>
			)}

			{/* кнопки фильтрации */}
			<Button onClick={() => changeFilterTodolistHandler("all")}>All</Button>
			<Button onClick={() => changeFilterTodolistHandler("active")}>Active</Button>
			<Button onClick={() => changeFilterTodolistHandler("completed")}>Completed</Button>
		</div>
	);
};

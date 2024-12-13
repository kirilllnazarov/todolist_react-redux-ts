import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "../Button/Button";
import s from "../../styles/todolist.module.css";

type Type = {
	addItemFromInput: (title: string) => void;
};

export const Input = ({ addItemFromInput }: Type) => {
	const [item, setItem] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const addItemTitle = () => {
		item.trim() ? addItemFromInput(item) : setError("Поле не заполнено");
		setItem("");
	};

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setError(null);
		setItem(event.currentTarget.value);
	};

	const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null);
		if (item.trim() && event.key === "Enter") {
			addItemFromInput(item);
			setItem("");
		} else if (!item.trim()) {
			setError("Поле не заполнено");
		}
	};

	return (
		<>
			<fieldset className={s.title}>
				<legend className={error ? s.error : ""}>{error ? <div>{error}</div> : "Поле ввода"}</legend>
				<input value={item} onChange={onChangeHandler} onKeyUp={onKeyUpHandler} />
				<Button onClick={addItemTitle}>➕</Button>
			</fieldset>
		</>
	);
};

import React, { ButtonHTMLAttributes } from "react";
import s from "../../styles/todolist.module.css";

type Type = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ onClick, children, ...rest }: Type) => {
	return (
		<button onClick={onClick} className={s.button}>
			{children}
		</button>
	);
};

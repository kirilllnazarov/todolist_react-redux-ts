import React, { InputHTMLAttributes } from 'react'

type Type = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({checked, onChange}: Type) => {
  return (
    <input type={'Checkbox'} checked={checked} onChange={onChange}/>
  )
}

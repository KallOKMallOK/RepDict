import React, { useRef, useState } from "react"
import useOutsideClick from "../hoc/OutsideClicker"


interface EditTextProps{
	text: string
	typeInput: "text" | "number"

	onChanged: (oldValue: string | number, newValue: string | number) => void
}

export const EditText: React.FC<EditTextProps> = props => {
	const [text, changeText] = useState(props.text)
	const [editing, changeEditing] = useState(false)
	const editTextRef = useRef<HTMLInputElement>(null)
	const editTextInputRef = useRef<HTMLInputElement>(null)




	const handleChangeEditing = (open: boolean, newValue?: string | number) => {
		if(open)
			changeEditing(true)
		else{
			changeEditing(false)
			props.onChanged(props.text, newValue || "")
		}
	}

	const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
		changeText(e.currentTarget.value)
	}

	const handlePressKeyInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === "Enter"){
			handleChangeEditing(false, editTextInputRef.current?.value)
			changeEditing(false)
		}
	}

	useOutsideClick(editTextRef, () => {
		if(editing) {
			handleChangeEditing(false, editTextInputRef.current?.value)
			changeEditing(false)
		}
	})

	return(
		<div className="edit_text" ref={editTextRef}>
			{
				editing ?
				<input ref={editTextInputRef} type={props.typeInput} value={text} onChange={handleChangeInput} onKeyPress={handlePressKeyInput} autoFocus/>:
				<span className="edit_text_content" onClick={() => handleChangeEditing(true)}>{text}</span>
			}
		</div>
	)
}
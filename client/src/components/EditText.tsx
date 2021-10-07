import React, { MouseEvent, useRef, useState } from "react"
import useOutsideClick from "../hoc/OutsideClicker"


interface EditTextProps{
	text: string
	typeInput: "text" | "number"

	onChanged: (oldValue: string | number, newValue: string | number) => void
}

export const EditText: React.FC<EditTextProps> = props => {
	const [text, changeText] = useState(props.text)
	const [editing, changeEditing] = useState(false)
	const editTextRef = useRef(null)

	const handleChangeEditing = (open: boolean, newValue?: string | number) => {
		if(open)
			changeEditing(true)
		else{
			changeEditing(false)
			props.onChanged(props.text, newValue!)
		}
	}

	const handlePressKeyInput = (e: any) => {
		if(e.key === "Enter"){
			handleChangeEditing(false, e.target.value)
			changeText(e.target.value)
		}
	}

	useOutsideClick(editTextRef, () => {
		if(editing) changeEditing(false)
	})

	return(
		<div className="edit_text" ref={editTextRef}>
			{
				editing ?
				<input type={props.typeInput} defaultValue={text} onKeyPress={e => handlePressKeyInput(e)}/>:
				<span className="edit_text_content" onClick={e => handleChangeEditing(true)}>{text}</span>
			}
		</div>
	)
}
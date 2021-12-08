import React from "react"
import styled from "styled-components"

interface InputProps extends React.HTMLProps<HTMLInputElement>{
	disabled?: boolean
	// ref?: typeof React.createRef
}


// eslint-disable-next-line @typescript-eslint/ban-types
export default class Input extends React.Component<InputProps, {}>{
	constructor(props: InputProps){
		super(props)
	}

	render(){
		return(
			<input {...this.props} type="text" className={`__input __input_default ${this.props.disabled ? "disabled": ""}`}/>
		)
	}
}

const InputStyled = styled.input`
	background-color: red;
	pointer-events: ${props => props.disabled ? "none" : "auto"};
	color: ${props => props.disabled ? "rgb(141, 141, 141)" : "white"};
`
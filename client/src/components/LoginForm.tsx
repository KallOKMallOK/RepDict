import React from 'react';
import { GoogleApiProvider } from 'react-gapi'

import AuthComponent from "./authComponent"

export enum ERefer {NOT = "NOT A SERVICE", GOOGLE = "Google", VK = "VK", FACEBOOK = "Facebook"}
export interface IRefer{
	name: ERefer,
	linkIcon: string
}

interface IPropsLoginProps{
	refers: IRefer[]
}


const LoginForm: React.FC<IPropsLoginProps> = props => {
	let inputLogin = React.useRef<HTMLInputElement>(null)
	let inputPassword = React.useRef<HTMLInputElement>(null)

	const authBasic = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		const loginValue = inputLogin.current?.value
		const passwordValue = inputPassword.current?.value

		console.log(loginValue, passwordValue);
	}

	const authViaGoogle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		
	}

	return (
	<form className="form_login">
		<h3 className="form_login_h3">Login Form</h3>
		<div className="inputs">
			<label htmlFor="">
				<input type="text" ref={inputLogin} className="form_login_input form_login_input_login" placeholder="Login"/>
			</label>
			<label htmlFor="">
				<input type="text" ref={inputPassword} className="form_login_input" placeholder="Password"/>
			</label>
		</div>
		
		<button onClick={(e) => authBasic(e)} className="form_login_button_login">Login</button>
		<p className="separator">OR</p>
		{
			props.refers.map((refer: IRefer) => {
				switch(refer.name){
					case ERefer.GOOGLE:
						return (<GoogleApiProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
							<AuthComponent/>
						</GoogleApiProvider>
						)
					default:
						return <button className="form_login_button_login form_login_button_login_refer">
							<img src={refer.linkIcon} alt={refer.name}/> Continue with {refer.name}
							</button>
				}

				
			})
		}
	</form>
  );
}

export default LoginForm

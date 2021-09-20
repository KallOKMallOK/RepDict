import React, { createRef, MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom'
import Action from "../redux/actions"

import API from "../api"

// Styles
import "../styles/forms.scss"
import { Notification } from '../components/Notification';

const mapStateToProps = (state: any) => ({
	auth: state.app.auth
})

const mapDispatchToProps = (f: Function) => ({
	login: (user: any) => f(Action.app.login(user))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>


interface StateLogin{
	loginValidate: boolean | null,
	passwordValidate: boolean | null
}

class Login extends React.Component<PropsFromRedux, StateLogin>{
	public state = {
		loginValidate: null,
		passwordValidate: null
	}
	private login = createRef<HTMLInputElement>()
	private password = createRef<HTMLInputElement>()

	constructor(props: PropsFromRedux){
		super(props)
	}

	clickLogin(e: MouseEvent){
		e.preventDefault()
		API.login({
			login: this.login.current?.value,
			password: this.password.current?.value
		})
			.then(res => this.props.login(res.data))
			.catch(err => Notification.error("Error", "Error on server"))
	}
	validateForm(e: any){
		console.log(e)
		switch(e.target.name){
			case "login":
				e.target.value.length > 3 && e.target.value.length < 30? this.setState({ loginValidate: true }): this.setState({ loginValidate: false })
				break
			case "password":
				e.target.value.length > 7 && e.target.value.length < 40? this.setState({ passwordValidate: true }): this.setState({ passwordValidate: false })
				break
			default:
				break
		}
	}

	render(){
		return(
			<div className="login">
				<form>
					<h2>Login</h2>
					<div className="form-floating mb-3">
						<input 
							type="text" 
							name="login" 
							onBlur={ e => this.validateForm(e) } 
							ref={this.login} 
							className={`input-login form-control 
								${this.state.loginValidate !== null ? 
									(this.state.loginValidate? "is-valid": "is-invalid"): 
									""}`} 
							id="floatingInput" 
							placeholder="your login" 
							/>
						<label htmlFor="floatingInput">Login</label>
					</div>

					<div className="form-floating mb-3">
						<input 
							type="password" 
							onBlur={ e => this.validateForm(e) } 
							ref={this.password} 
							className={`input-password form-control 
								${this.state.passwordValidate !== null ? 
									(this.state.passwordValidate? "is-valid": "is-invalid"): 
									""}`} 
							id="floatingInput"
							name="password"
							placeholder="your password" 
							/>
						<label htmlFor="floatingInput">Password</label>
					</div>

					<button className="btn btn-primary" onClick={e => this.clickLogin(e)}>login</button>
				</form>
			</div>
		)
	}
}

export default connector(Login)
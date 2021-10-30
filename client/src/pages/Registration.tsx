import React, { createRef, MouseEvent } from "react"
import { connect, ConnectedProps } from "react-redux"
import { RouteComponentProps } from "react-router-dom"

import API from "../api"
import { Notification } from "../components/Notification"
import Action from "../redux/actions"

import "../styles/forms.scss"

const mapStateToProps = (state: any) => ({
	auth: state.app.auth
})

const mapDispatchToProps = (f: Function) => ({
	login: (user: any) => f(Action.app.login(user))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector> & RouteComponentProps 

interface RegistrationState{
	nameValidate: boolean | null
	loginValidate: boolean | null
	passwordValidate: boolean | null
}

class Registration extends React.Component<PropsFromRedux, RegistrationState>{
	public state = {
		nameValidate: null,
		loginValidate: null,
		passwordValidate: null
	}
	private name = createRef<HTMLInputElement>()
	private login = createRef<HTMLInputElement>()
	private password = createRef<HTMLInputElement>()
	private rpassword = createRef<HTMLInputElement>()

	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(props: PropsFromRedux){
		super(props)
	}

	clickRegistration(e: MouseEvent){
		e.preventDefault()
		if(this.state.loginValidate && this.state.nameValidate && this.state.passwordValidate){
			if(this.password.current?.value === this.rpassword.current?.value){
				API.registration({
					name: this.name.current?.value,
					login: this.login.current?.value,
					password: this.password.current?.value,
					refer: null
				})
					.then(res => {
						
						console.log(res)
						if(!res.data.error){
							this.props.login(res.data)
							this.props.history.push("/")
						}
						else
							Notification.error("Ошибка", "Возможно, такой логин уже занят", 4000)
					})
					.catch(err => console.log(err))
			}
			// Exception: passwords is not equal
			else 
				Notification.warning("Ошибка", "Пароли не совпадают", 4000)
		}
		else Notification.warning("Ошибка", "Введите корректные данные", 4000)
		
	}

	onValidate(e: MouseEvent<HTMLInputElement>){
		console.log(e);
		switch(e.currentTarget.name){
			case "name":
				this.setState({ nameValidate: e.currentTarget.value.length > 4 }); break
			case "login":
				this.setState({ loginValidate: e.currentTarget.value.length > 3 }); break
			case "password":
				this.setState({ passwordValidate: e.currentTarget.value.length > 7 }); break
		}
	}

	render(){
		return(
			<div className="registration">
				<form>
					<h2>Registration</h2>
					<div className="form-floating mb-3">
						<input 
							name="name"
							className={`form-control 
								${this.state.nameValidate !== null ? 
									(this.state.nameValidate? "is-valid": 
									"is-invalid"): 
								""}
							`}
							onBlur={e => this.onValidate(e as any)}
							type="text" 
							ref={this.name} 
							id="floatingInput"
							placeholder="your name" />
						<label htmlFor="floatingInput">Name</label>
					</div>
					<div className="form-floating mb-3">
						<input 
							name="login"
							className={`form-control 
								${this.state.loginValidate !== null ? 
									(this.state.loginValidate? 
										"is-valid": 
										"is-invalid"): 
									""}
								`}
							onBlur={e => this.onValidate(e as any)}
							type="text" 
							ref={this.login} 
							id="floatingInput" 
							placeholder="your login" />
						<label htmlFor="floatingInput">Login</label>
					</div>

					<div className="form-floating mb-3">
						<input 
							name="password"
							className={`form-control 
								${this.state.passwordValidate !== null ? 
									(this.state.passwordValidate? 
										"is-valid": 
										"is-invalid"): 
									""}
								`}
							onBlur={e => this.onValidate(e as any)}
							type="password" 
							ref={this.password} 
							id="floatingInput" 
							placeholder="your password" />
						<label htmlFor="floatingInput">Password</label>
					</div>
					<div className="form-floating mb-3">
						<input 
							type="password" 
							ref={this.rpassword} 
							className="form-control" 
							id="floatingInput" 
							placeholder="your password" 
						/>
						<label htmlFor="floatingInput">Repeat password</label>
					</div>

					<button className="btn btn-primary" onClick={e => this.clickRegistration(e)}>registration</button>
				</form>
			</div>
		)
	}
}

export default connector(Registration)
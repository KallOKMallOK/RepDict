import React, { createRef, MouseEvent } from "react"
import { connect, ConnectedProps } from "react-redux"

import API from "../api"
import Action from "../redux/actions"

import "../styles/forms.scss"

const mapStateToProps = (state: any) => ({
	auth: state.app.auth
})

const mapDispatchToProps = (f: Function) => ({
	login: (user: any) => f(Action.app.login(user))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>


class Registration extends React.Component<PropsFromRedux>{
	public state: object = {}
	private name = createRef<HTMLInputElement>()
	private login = createRef<HTMLInputElement>()
	private password = createRef<HTMLInputElement>()
	private rpassword = createRef<HTMLInputElement>()

	constructor(props: PropsFromRedux){
		super(props)
	}

	clickRegistration(e: MouseEvent){
		e.preventDefault()
		if(this.password.current?.value === this.rpassword.current?.value){
			API.registration({
				name: this.name.current?.value,
				login: this.login.current?.value,
				password: this.password.current?.value,
				refer: null
			})
				.then(res => {
					// this.props.history.push("/")
					this.props.login(res.data)
				})
				.catch(err => console.log(err))
		}
		else {
			// Exception: passwords is not equal
			console.log("passwords is not equal")
		}
	}

	render(){
		return(
			<div className="registration">
				<form>
					<h2>Registration</h2>
					<div className="form-floating mb-3">
						<input type="text" ref={this.name} className="form-control" id="floatingInput" placeholder="your name" />
						<label htmlFor="floatingInput">Name</label>
					</div>
					<div className="form-floating mb-3">
						<input type="text" ref={this.login} className="form-control" id="floatingInput" placeholder="your login" />
						<label htmlFor="floatingInput">Login</label>
					</div>

					<div className="form-floating mb-3">
						<input type="password" ref={this.password} className="form-control" id="floatingInput" placeholder="your password" />
						<label htmlFor="floatingInput">Password</label>
					</div>
					<div className="form-floating mb-3">
						<input type="password" ref={this.rpassword} className="form-control" id="floatingInput" placeholder="your password" />
						<label htmlFor="floatingInput">Repeat password</label>
					</div>

					<button className="btn btn-primary" onClick={e => this.clickRegistration(e)}>registration</button>
				</form>
			</div>
		)
	}
}




export default connector(Registration)
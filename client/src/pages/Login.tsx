import React, { createRef, MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, RouteComponentProps, Router } from 'react-router-dom'
import Action from "../redux/actions"

import API from "../api"

// Styles
import "../styles/forms.scss"

const mapStateToProps = (state: any) => ({
	auth: state.app.auth
})

const mapDispatchToProps = (f: Function) => ({
	login: (user: any) => f(Action.app.login(user))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

class Login extends React.Component<PropsFromRedux>{
	public state: object = {}
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
			.catch(err => console.log(err))
	}

	render(){
		return(
			<div className="registration">
				<form>
					<h2>Login</h2>
					<div className="form-floating mb-3">
						<input type="text" ref={this.login} className="form-control" id="floatingInput" placeholder="your login" />
						<label htmlFor="floatingInput">Login</label>
					</div>

					<div className="form-floating mb-3">
						<input type="password" ref={this.password} className="form-control" id="floatingInput" placeholder="your password" />
						<label htmlFor="floatingInput">Password</label>
					</div>

					<button className="btn btn-primary" onClick={e => this.clickLogin(e)}>login</button>
				</form>
			</div>
		)
	}
}

export default connector(Login)

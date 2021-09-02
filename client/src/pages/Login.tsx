import React from 'react';
import { Link, RouteComponentProps, Router } from 'react-router-dom'

import LoginFormComponent, { ERefer, IRefer } from "../components/LoginForm"

// Styles
import "../styles/login.scss"


interface IPropsLogin extends RouteComponentProps{
	info?: Object
}


const Login: React.FC<IPropsLogin> = props=> {
	const refers: Array<IRefer> = [
		{
			name: ERefer.GOOGLE, 
			linkIcon: "https://img.icons8.com/color/452/google-logo.png"
		},
		{
			name: ERefer.VK,
			linkIcon: "https://cdn.worldvectorlogo.com/logos/vk-com-logo.svg"
		}
	]
  return (
	<section className="section_form_login">
		<LoginFormComponent refers={refers} />
	</section>
  );
}

export default Login;

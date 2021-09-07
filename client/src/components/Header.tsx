import React from 'react';
import '../styles/header.scss';
import { IRoute } from "../routes"
import { Link } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux';
import Action from "../redux/actions"

const mapStateToProps = (state: any) => ({
	auth: state.app.auth,
	user: state.app.user
})

const mapDispatchToProps = (f: Function) => ({
	login: (user: any) => f(Action.app.login(user))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>


interface AppProps extends PropsFromRedux{
	routes: IRoute[]
}


const Header: React.FC<AppProps> = props => {
	return (
		<header className="main_header">
			<div className="logo">
				<span className="logo_text"><Link to="/">RepDict</Link></span>
			</div>

			<div className="menu">
				<ul className="menu_list">
					{
						props.routes.filter(route => route.isLogin === props.auth).map((route: IRoute) => {
							return <li key={route.path} className="menu_list_item">
									<Link className="menu_list_item_link" to={`${route.path}`}>{route.name}</Link>
								</li>
						})
					}
					{
						props.auth && <li style={{ color: "white" }}>{props.user.name}</li>
					}
				</ul>
				
			</div>
		</header>
	);
}

export default connector(Header)

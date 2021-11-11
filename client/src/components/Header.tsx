import React, {  useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { FaUser, FaBars } from "react-icons/fa"

// Controllers data
import { IRoute } from "../routes"
import Action from "../redux/actions"
import useOutsideClick from "../hoc/OutsideClicker"

// Styles
import "../styles/components.scss"
import { Dispatch } from 'redux'
import { RootState } from '../redux/store'
import { User } from '../domains/entities/user.entity'

// -----------------------------------------------------------------------------
// ---------------------- Connect to redux emmiter -----------------------------
// -----------------------------------------------------------------------------

const mapStateToProps = (state: RootState) => ({
	auth: state.app.auth,
	user: state.app.user
})

const mapDispatchToProps = (f: Dispatch) => ({
	login: (user: User) => f(Action.app.login(user)),
	logout: () => f(Action.app.logout())
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>



interface AppProps extends PropsFromRedux{
	routes: IRoute[]
}

// -----------------------------------------------------------------------------
// -------------------- Header hook including interfaces -----------------------
// -----------------------------------------------------------------------------

const Header: React.FC<AppProps> = props => {

	const [dropdownVisible, openDropdownUser] = useState(false)
	const [menuVisible, openMenuUser] = useState(false)

	const dropdownRef = useRef<HTMLUListElement>(null)
	const match = useLocation().pathname

	useOutsideClick(dropdownRef, () => {
		if(dropdownVisible) openDropdownUser(false)
	})
	
	useEffect(() => {
		if(menuVisible)
			document.body.style.overflow = 'hidden'
		else
			document.body.style.overflow = 'unset'
	}, [menuVisible ])

	const logout = () => {
		props.logout()
		openMenuUser(false)
	}
	
	return (
		<header className="main_header">
			<div className="logo">
				<span className="logo_text"><Link to="/" onClick={() => openMenuUser(false)}>RepDict</Link></span>
			</div>

			<div className="menu">
				<div className="icon_bars" onClick={() => openMenuUser(!menuVisible)}>
					<FaBars />
				</div>

				<ul className={`menu_list responsive_${menuVisible ? "active": "noactive"}`}>
					{
						props.routes.filter(route => route.isLogin === props.auth || route.isLogin === undefined)
							.map((route: IRoute) => {
							return <li 
								key={route.path} 
								className={`menu_list_item ${route.path === match ? "active": "noactive"}`}>
									<Link 
										className="menu_list_item_link" 
										to={`${route.path}`} onClick={() => openMenuUser(false)}>
										{!!route.icon && <route.icon/>}
										{route.name}
										
									</Link>
								</li>
						})
					}
					{
						// User panel
						props.auth && <li style={{ color: "white" }} className="user_panel" onClick={() => openDropdownUser(!dropdownVisible)}>
							<div className="user_panel_head"><FaUser />{props.user.name} <span className="user__balance">{props.user.balance}</span></div>
							<ul className={`dropdown ${dropdownVisible? "showedDB__fadeIn": "closed"}`} ref={dropdownRef}>
								<li className="dropdown_item">
									<Link to={`/user/${props.user.login}`} onClick={() => openMenuUser(false)}>Profile</Link>
								</li>
								<li className="dropdown_item">
									<Link to="/settings" onClick={() => openMenuUser(false)}>Setting</Link>
								</li>
								<li className="dropdown_item">
									<Link to="/" onClick={() => logout()}>Logout</Link>
								</li>
							</ul>
						</li>
					}
				</ul>
				
			</div>
		</header>
	);
}

export default connector(Header)

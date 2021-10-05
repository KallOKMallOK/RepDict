import React, {  useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { FaUser, FaBars } from "react-icons/fa"

// Controllers data
import { IRoute } from "../routes"
import Action from "../redux/actions"
import useOutsideClick from "../hoc/OutsideClicker"

// Styles
import "../styles/components.scss"

// -----------------------------------------------------------------------------
// ---------------------- Connect to redux emmiter -----------------------------
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// -------------------- Header hook including interfaces -----------------------
// -----------------------------------------------------------------------------

const Header: React.FC<AppProps> = props => {
	const [dropdownVisible, openDropdownUser] = useState(false)
	const [menuVisible, openMenuUser] = useState(true)

	const dropdownRef = useRef<any>(null)
	const match = useLocation().pathname

	useOutsideClick(dropdownRef, () => {
		if(dropdownVisible) openDropdownUser(false)
	})
	
	return (
		<header className="main_header">
			<div className="logo">
				<span className="logo_text"><Link to="/">RepDict</Link></span>
			</div>

			<div className="menu">
				<div className="icon_bars" onClick={e => openMenuUser(!menuVisible)}>
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
										to={`${route.path}`} onClick={e => openMenuUser(false)}>
										{!!route.icon && <route.icon/>}
										{route.name}
									</Link>
								</li>
						})
					}
					{
						// User panel
						props.auth && <li style={{ color: "white" }} className="user_panel" onClick={e => openDropdownUser(!dropdownVisible)}>
							<div className="user_panel_head"><FaUser />{props.user.name}</div>
							<ul className={`dropdown ${dropdownVisible? "showedDB__fadeIn": "closed"}`} ref={dropdownRef}>
								<li className="dropdown_item">
									<Link to="/settings" onClick={e => openMenuUser(false)}>Setting</Link>
								</li>
								<li className="dropdown_item">
									<Link to="/logout" onClick={e => openMenuUser(false)}>Logout</Link>
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

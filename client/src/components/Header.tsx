import React, {  useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import Select, { components } from 'react-select'
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
import { ELangsInterface, LangsInterface } from '../redux/types'
import { useTranslation, withTranslation } from 'react-i18next'

// -----------------------------------------------------------------------------
// ---------------------- Connect to redux emmiter -----------------------------
// -----------------------------------------------------------------------------

const mapStateToProps = (state: RootState) => ({
	auth: state.app.auth,
	user: state.app.user,
	lang: state.app.lang
})

const mapDispatchToProps = (f: Dispatch) => ({
	login: (user: User) => f(Action.app.login(user)),
	logout: () => f(Action.app.logout()),
	changeLangInterface: (lang: ELangsInterface) => f(Action.app.changeLang(lang))
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

	const { t } = useTranslation()

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
										{t(`Components.Header.${route.name}`)}
										{/* {route.name} */}
									</Link>
								</li>
						})
					}
					{/* <div className="theme_interface_toggler">
						Dark/Light
					</div>*/}
					<div className="language_interaface_toggler">

						<Select
							options={LangsInterface.map(__lang => {return { value: __lang.alias, label: __lang.displayName }})}
							onChange={e => props.changeLangInterface(e?.value as ELangsInterface)}
							value={{ value: props.lang, label: (LangsInterface.filter(l => l.alias === props.lang))[0].displayName}}
							isSearchable={false}
							components={{
								Control: ({ children, ...rest }) => (
									<components.Control {...rest}>
										<div className="img_wrapper pl-2">
											<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/OOjs_UI_icon_language-ltr.svg/1024px-OOjs_UI_icon_language-ltr.svg.png" width={20} alt="lang"/>
										</div>{children}
									</components.Control>
								)}}
						/>
						{/* <select 
							className="select_lang form-select" 
							aria-label="Default select example"
							onChange={e => props.changeLangInterface(e.currentTarget.value as ELangsInterface)}
							>
							{
								LangsInterface.map(langItem => {
									return <option 
										selected={langItem.alias === props.lang}
										key={langItem.internationalName} 
										value={langItem.alias}
										>
											{langItem.displayName}
										</option>
								})
							}
						</select> */}
					</div> 
					{
						// User panel
						props.auth && <li style={{ color: "white" }} className="user_panel" onClick={() => openDropdownUser(!dropdownVisible)}>
							<div className="user_panel_head"><FaUser />{props.user.name} <span className="user__balance">{props.user.balance}</span></div>
							<ul className={`dropdown ${dropdownVisible? "showedDB__fadeIn": "closed"}`} ref={dropdownRef}>
								<li className="dropdown_item">
									<Link to={`/user/${props.user.login}`} onClick={() => openMenuUser(false)}>{t(`Components.Header.Profile`)}</Link>
								</li>
								<li className="dropdown_item">
									<Link to="/settings" onClick={() => openMenuUser(false)}>{t(`Components.Header.Settings`)}</Link>
								</li>
								<li className="dropdown_item">
									<Link to="/" onClick={() => logout()}>{t(`Components.Header.Logout`)}</Link>
								</li>
							</ul>
						</li>
					}
				</ul>
				
			</div>
		</header>
	);
}

export default connector(withTranslation()(Header))


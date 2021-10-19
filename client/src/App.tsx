import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

// Controllers data
import API from "./api"
import { routes } from './routes';
import Action from "./redux/actions"

// Components
import Components, { showLoader, hideLoader } from "./components"
import Authorization from './hoc/Authorization'
import ModalContainer from "./components/modals"


// App styles
import "./styles/reset.scss"
import './styles/main.scss'
import './styles/responsive.scss'
import 'react-notifications/lib/notifications.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { POPUP_TYPES } from './redux/types'

// -----------------------------------------------------------------------------
// ---------------------- Connect to redux emmiter -----------------------------
// -----------------------------------------------------------------------------

const mapStateToProps = (state: any) => ({
	auth: state.app.auth,
	notify: state.notification,
	popupProps: state.popup
})

const mapDispatchToProps = (f: Function) => ({
	login: (user: any) => f(Action.app.login(user)),
	logout: () => f(Action.app.logout()),
	confirm: (head: string, content: string, close: () => void, success: (s: boolean) => void) => 
		f(Action.popup.show(POPUP_TYPES.CONFIRM, head, content, {close, success}))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface StateApp{
	auth: boolean
}


// -----------------------------------------------------------------------------
// ------------------------- Switcher for Router -------------------------------
// -----------------------------------------------------------------------------

class Switcher extends React.PureComponent<StateApp>{
	constructor(props: any){
		super(props)
	}
	render(){
		return(
			<Switch>
				{routes.map(route => {
					const component = route.isPrivate ? Authorization(route.component, this.props.auth) : route.component;
					return (
						<Route
						key={route.path}
						exact
						path={route.path}
						component={component}
						/>
					)
				})}
			</Switch>
		)
	}
}


// -----------------------------------------------------------------------------
// -------------------- App class including interfaces -------------------------
// -----------------------------------------------------------------------------


class App extends React.Component<PropsFromRedux, StateApp>{
	public state: StateApp = {
		auth: true
	}
	// Refs for element which need change because outside click
	

	constructor(props: PropsFromRedux){
		super(props)
		console.log(`
    ____  __________  ____  ________________   _________            __
   / __ \\/ ____/ __ \\/ __ \\/  _/ ____/_  __/  / ____/ (_)__  ____  / /_
  / /_/ / __/ / /_/ / / / // // /     / /    / /   / / / _ \\/ __ \\/ __/
 / _, _/ /___/ ____/ /_/ // // /___  / /    / /___/ / /  __/ / / / /_
/_/ |_/_____/_/   /_____/___/\\____/ /_/     \\____/_/_/\\___/_/ /_/\\__/
		`);
	}
	componentDidMount(){
		if(localStorage.getItem("token")?.length !== undefined && localStorage.getItem("token") !== "undefined"){
			API.auth()
				.then(res => {
					if(!res.data.error){
						this.setState({ auth: true })
						this.props.login(res.data.data)
					}
					else this.props.logout()
					
				})
				.catch(err => console.log(err))
		}
		else{
			this.setState({ auth: false })
			localStorage.removeItem("token")
		}
		hideLoader()
	}

	render(){
		return(
			<Router>
			<React.Fragment>
				<Components.Header routes={routes.filter(route => route.isNavBar)}/>
				<Switcher auth={this.state.auth || this.props.auth}/>
				<Components.Notification {...this.props.notify}/>
				<ModalContainer {...this.props.popupProps}/>
			</React.Fragment>
		</Router>
		)
	}
}

export default connector(App)

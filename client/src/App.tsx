import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'

// Controllers data
import API from "./api"
import { routes } from './routes';
import Action from "./redux/actions"

// Components
import Components from "./components"
import { Notification } from "./components/Notification"
import Authorization from './hoc/Authorization'

// App styles
import "./styles/reset.scss"
import './styles/main.scss';
import './styles/responsive.scss';
import 'react-notifications/lib/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// -----------------------------------------------------------------------------
// ---------------------- Connect to redux emmiter -----------------------------
// -----------------------------------------------------------------------------

const mapStateToProps = (state: any) => ({
	auth: state.app.auth,
	notify: state.notification
})

const mapDispatchToProps = (f: Function) => ({
	login: (user: any) => f(Action.app.login(user)),
	logout: () => f(Action.app.logout()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface StateApp{
	auth: boolean
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
	}

	componentDidMount(){
		if(localStorage.getItem("token")?.length !== undefined && localStorage.getItem("token") !== "undefined"){
			API.auth()
				.then(res => {
					console.log(res)
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
		}
	}

	renderSwitch(){
	 return(
		<Switch>
		  {routes.map(route => {
			 const component = route.isPrivate ? Authorization(route.component, this.state.auth) : route.component;
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
  render(){
	 return(
		<Router>
		  <React.Fragment>
			 <Components.Header routes={routes.filter(route => route.isNavBar)}/>
			 <div id='ui-content'>
				{this.renderSwitch()}
			 </div>
			 <Components.Notification {...this.props.notify}/>
		  </React.Fragment>
		</Router>
	 )
  }
}

export default connector(App)

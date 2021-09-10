import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux';

// Controllers data
import API from "./api"
import { routes } from './routes';
import Action from "./redux/actions"

// Components
import Components from "./components"
// import useOutsideClick from "./hoc/OutsideClicker"
import Authorization from './hoc/Authorization'

// App styles
import "./styles/reset.scss"
import './styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// -----------------------------------------------------------------------------
// ---------------------- Connect to redux emmiter -----------------------------
// -----------------------------------------------------------------------------

const mapStateToProps = (state: any) => ({
	auth: state.app.auth
})

const mapDispatchToProps = (f: Function) => ({
	login: (user: any) => f(Action.app.login(user))
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

		if(localStorage.getItem("token") && localStorage.getItem("token")?.length !== 0){
			API.auth()
				.then(res => {
					if(!res.data.error){
						this.setState({ auth: true })
						this.props.login(res.data)
					}
				})
				.catch(err => console.log(err))
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
		  </React.Fragment>
		</Router>
	 )
  }
}

export default connector(App)

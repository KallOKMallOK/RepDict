import React from 'react';
import { Link, RouteComponentProps, BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import API from "./api"
import Action from "./redux/actions"

// Components
import Components from "./components"

// App styles
import "./styles/reset.scss"
import './styles/main.scss';
import { routes } from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: any) => ({
	auth: state.app.auth
})

const mapDispatchToProps = (f: Function) => ({
	login: (user: any) => f(Action.app.login(user))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

class App extends React.Component<PropsFromRedux>{
	constructor(props: PropsFromRedux){
		super(props)
	}

	componentDidMount(){
		if(localStorage.getItem("token") && localStorage.getItem("token")?.length !== 0){
			API.auth()
				.then(res => {
					console.log(res)
					!res.data.error && this.props.login(res.data)
				})
				.catch(err => console.log(err))
		}
	}

	renderSwitch(){
	 return(
		<Switch>
		  {routes.map(route => {
			 // const component = route.isPrivate ? Authorization(route.component) : route.component;
			 const component = route.component;
			 return (
				<Route
				  key={route.path}
				  exact={route.isExact}
				  path={route.path}
				  component={component}
				/>
			 );
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

import React from 'react';
import { Link, RouteComponentProps, BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Components
import Components from "./components"

// App styles
import "./styles/reset.scss"
import './styles/main.scss';
import { routes } from './routes';


const App = () => {

  const renderSwitch = () => (
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
  );

  return (
    <Router>
      <React.Fragment>
        <Components.Header routes={routes.filter(route => route.isNavBar)} />
        <div id='ui-content'>
          {renderSwitch()}
        </div>
      </React.Fragment>
    </Router>
  );
};

export default App;

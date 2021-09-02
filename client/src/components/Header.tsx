import React from 'react';
import '../styles/header.scss';
import { IRoute } from "../routes"
import { Link } from 'react-router-dom'

interface AppProps{
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
            props.routes.map((route: IRoute) => {
              return <li key={route.path} className="menu_list_item"><Link className="menu_list_item_link" to={`${route.path}`}>{route.name}</Link></li>
            })
          }
        </ul>
        
      </div>
    </header>
  );
}

export default Header;

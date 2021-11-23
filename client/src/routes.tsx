import Pages from "./pages"
import { 
	FaHome,
	FaPlay,
	FaList,
	FaStore,
	FaChartBar,
	FaStar,
} from "react-icons/fa"
 
export interface IRoute{
	isNavBar?: boolean,
	isExact?: boolean,
	path: string,
	name: string,
	component: any,
	isPrivate?: boolean,
	isLogin?: boolean,
	icon?: typeof FaHome
}

export const routes: IRoute[] = [
	// with auth
	{
		// dashboard - last cards and statistics
		isNavBar: false,
		isLogin: false,
		isExact: true,
		path: '/',
		name: 'Main',
		component: Pages.Main
	},
	{
		// dashboard - last cards and statistics
		isNavBar: false,
		isLogin: true,
		isExact: true,
		isPrivate: true,
		path: '/home',
		name: 'Home',
		component: Pages.Home,
		icon: FaHome
	},
	{
		isNavBar: false,
		isLogin: true,
		isExact: true,
		isPrivate: false,
		path: '/play/:id',
		name: 'Play',
		component: Pages.Play,
		icon: FaPlay
	},
	{
		// public and private Decks - card store
		isNavBar: true,
		isLogin: true,
		isExact: true,
		isPrivate: true,
		path: '/decks',
		name: 'Decks',
		component: Pages.Decks,
		icon: FaList
	},
	{
		// public and private cards - card store
		isNavBar: true,
		isExact: true,
		path: '/store',
		name: 'Store',
		component: Pages.Store,
		icon: FaStore
	},
	{
		isNavBar: false,
		isLogin: true,
		isExact: true,
		isPrivate: true,
		path: '/statistics',
		name: 'Statistics',
		component: Pages.Statistics,
		icon: FaChartBar
	},
	{
		isNavBar: true,
		isExact: true,
		path: '/rating',
		name: 'Rating',
		component: Pages.Rating,
		icon: FaStar
	},
	
	// not auth
	{
		isNavBar: true,
		isExact: true,
		isLogin: false,
		path: '/registration',
		name: 'Registration',
		component: Pages.Registration
	},
	{
		isNavBar: true,
		isLogin: false,
		isExact: true,
		path: '/login',
		name: 'Login',
		component: Pages.Login
	},



	// not in header
	{
		isNavBar: false,
		isLogin: false,
		isExact: true,
		path: '/user/:login',
		name: 'User',
		component: Pages.User
	},
	{
		isNavBar: false,
		isLogin: true,
		isExact: true,
		path: '/settings',
		name: 'Settings for User',
		component: Pages.SettingsUser
	}

	
];

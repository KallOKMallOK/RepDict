import Pages from "./pages"
import Registration from "./pages/Registration"

export interface IRoute{
	isNavBar?: boolean,
	isExact?: boolean,
	path: string,
	name: string,
	component: any,
	isPrivate?: boolean,
	isLogin?: boolean
}

export const routes: IRoute[] = [
	// with auth
	{
		// dashboard - last cards and statistics
		isNavBar: true,
		isLogin: true,
		isExact: true,
		path: '/',
		name: 'Home',
		component: Pages.Home
	},
	{
		isNavBar: true,
		isLogin: true,
		isExact: true,
		path: '/play',
		name: 'Play',
		component: Pages.Home
	},
	{
		// public and private cards - card store
		isNavBar: true,
		isLogin: true,
		isExact: true,
		path: '/cards',
		name: 'Cards',
		component: Pages.Cards
	},
	{
		isNavBar: true,
		isLogin: true,
		isExact: true,
		path: '/statistics',
		name: 'Statistics',
		component: Pages.Statistics
	},
	{
		isNavBar: true,
		isLogin: true,
		isExact: true,
		path: '/rating',
		name: 'Rating',
		component: Pages.Statistics
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
		path: '/user/:id',
		name: 'User',
		component: Pages.Home
	},

	
];

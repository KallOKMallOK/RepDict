import Pages from "./pages"

export interface IRoute{
  isNavBar?: boolean,
  isExact?: boolean,
  path: string,
  name: string,
  component: any,
  isPrivate?: boolean
}

export const routes: IRoute[] = [
  {
    isNavBar: true,
    isExact: true,
    path: '/',
    name: 'Home',
    component: Pages.Home
  },
  {
    isNavBar: true,
    path: '/cards',
    name: 'Cards',
    component: Pages.Cards
  },
  {
    isNavBar: true,
    path: '/statistics',
    name: 'Statistics',
    component: Pages.Statistics
  },

  // Login - Last Route
  {
    isNavBar: true,
    path: '/login',
    name: 'Login',
    component: Pages.Login
  }
];

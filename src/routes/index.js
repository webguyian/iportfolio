import HomescreenView from 'pages/homescreen/HomescreenView';
import LockscreenView from 'pages/lockscreen/LockscreenView';

const routes = [
  {
    path: '/',
    pathKey: 'lock',
    component: LockscreenView
  },
  {
    path: '/home',
    pathKey: 'home',
    component: HomescreenView
  }
];

export default routes;

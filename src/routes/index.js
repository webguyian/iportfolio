import CalculatorView from 'views/calculator/CalculatorView';
import HomescreenView from 'views/homescreen/HomescreenView';
import LockscreenView from 'views/lockscreen/LockscreenView';
import NotesView from 'views/notes/NotesView';
import RemindersView from 'views/reminders/RemindersView';

const routes = [
  {
    path: '/',
    pathKey: 'lock',
    component: LockscreenView,
    exact: true
  },
  {
    path: '/home',
    pathKey: 'home',
    component: HomescreenView
  },
  {
    path: '/calculator',
    pathKey: 'calculator',
    component: CalculatorView
  },
  {
    path: '/reminders',
    pathKey: 'reminders',
    component: RemindersView
  },
  {
    path: '/notes',
    pathKey: 'notes',
    component: NotesView,
    exact: false
  }
];

export default routes;

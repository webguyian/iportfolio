import CalculatorView from 'views/calculator/CalculatorView';
import ClockView from 'views/clock/ClockView';
import HomescreenView from 'views/homescreen/HomescreenView';
import LockscreenView from 'views/lockscreen/LockscreenView';
import NotesView from 'views/notes/NotesView';
import RemindersView from 'views/reminders/RemindersView';
import StocksView from 'views/stocks/StocksView';

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
    path: '/clock',
    pathKey: 'clock',
    component: ClockView,
    exact: false
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
  },
  {
    path: '/stocks',
    pathKey: 'stocks',
    component: StocksView
  }
];

export default routes;

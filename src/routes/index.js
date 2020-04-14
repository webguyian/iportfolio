import CalculatorView from 'views/calculator/CalculatorView';
import CalendarView from 'views/calendar/CalendarView';
import ClockView from 'views/clock/ClockView';
import HomescreenView from 'views/homescreen/HomescreenView';
import LockscreenView from 'views/lockscreen/LockscreenView';
import MapView from 'views/map/MapView';
import NotesView from 'views/notes/NotesView';
import RemindersView from 'views/reminders/RemindersView';
import StocksView from 'views/stocks/StocksView';
import WeatherView from 'views/weather/WeatherView';

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
    path: '/calendar',
    pathKey: 'calendar',
    component: CalendarView
  },
  {
    path: '/clock',
    pathKey: 'clock',
    component: ClockView,
    exact: false
  },
  {
    path: '/map',
    pathKey: 'map',
    component: MapView
  },
  {
    path: '/notes',
    pathKey: 'notes',
    component: NotesView,
    exact: false
  },
  {
    path: '/reminders',
    pathKey: 'reminders',
    component: RemindersView
  },
  {
    path: '/stocks',
    pathKey: 'stocks',
    component: StocksView
  },
  {
    path: '/weather',
    pathKey: 'weather',
    component: WeatherView,
    exact: false
  }
];

export default routes;

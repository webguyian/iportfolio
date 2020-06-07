import CalculatorView from 'views/calculator/CalculatorView';
import CalendarView from 'views/calendar/CalendarView';
import ClockView from 'views/clock/ClockView';
import HomescreenView from 'views/homescreen/HomescreenView';
import MailView from 'views/mail/MailView';
import MapView from 'views/map/MapView';
import MusicView from 'views/music/MusicView';
import NotesView from 'views/notes/NotesView';
import PhoneView from 'views/phone/PhoneView';
import RemindersView from 'views/reminders/RemindersView';
import StocksView from 'views/stocks/StocksView';
import WeatherView from 'views/weather/WeatherView';

const routes = [
  {
    path: '/',
    pathKey: 'home',
    component: HomescreenView
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
    path: '/mail',
    pathKey: 'mail',
    component: MailView
  },
  {
    path: '/map',
    pathKey: 'map',
    component: MapView
  },
  {
    path: '/music',
    pathKey: 'music',
    component: MusicView,
    exact: false
  },
  {
    path: '/notes',
    pathKey: 'notes',
    component: NotesView,
    exact: false
  },
  {
    path: '/phone',
    pathKey: 'phone',
    component: PhoneView
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

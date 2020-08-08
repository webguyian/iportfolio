import CalculatorView from 'views/CalculatorView';
import CalendarView from 'views/CalendarView';
import CameraView from 'views/CameraView';
import ClockView from 'views/ClockView';
import HomescreenView from 'views/HomescreenView';
import MailView from 'views/MailView';
import MapView from 'views/MapView';
import MusicView from 'views/MusicView';
import NotesView from 'views/NotesView';
import PhoneView from 'views/PhoneView';
import RemindersView from 'views/RemindersView';
import StocksView from 'views/StocksView';
import WeatherView from 'views/WeatherView';

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
    path: '/camera',
    pathKey: 'camera',
    component: CameraView
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

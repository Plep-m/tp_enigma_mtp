import { createNavigator } from './StackNavigator';
import AppController from '../controllers/AppController';
import ProfileController from '../controllers/ProfileController';
import SettingsController from '../controllers/SettingsController';
import AdminController from '../controllers/AdminController';
import ItineraryController from '@/controllers/ItineraryController';
import DetailController from '@/controllers/DetailController';
import PlayActivityController from '@/controllers/PlayActivityController';

const { Navigator } = createNavigator(
  {
    App:      AppController,
    Profile:  ProfileController,
    Settings: SettingsController,
    Admin:    AdminController,
    Map:      ItineraryController,
    Detail:   DetailController,
    Play:     PlayActivityController,
  },
  'App',
);

export default Navigator;

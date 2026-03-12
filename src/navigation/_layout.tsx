import { createNavigator } from './StackNavigator';
import AppController from '../controllers/AppController';
import ProfileController from '../controllers/ProfileController';
import SettingsController from '../controllers/SettingsController';
import AdminController from '../controllers/AdminController';
import ItineraryController from '@/controllers/ItineraryController';

const { Navigator, useAppNavigation } = createNavigator(
  {
    App:      AppController,
    Profile:  ProfileController,
    Settings: SettingsController,
    Admin:    AdminController,
    Map:      ItineraryController
  },
  'App',
);

export { useAppNavigation };
export default Navigator;

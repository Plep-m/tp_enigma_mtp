import { createNavigator } from './StackNavigator';
import AppController from '../controllers/AppController';
import ProfileController from '../controllers/ProfileController';
import SettingsController from '../controllers/SettingsController';
import AdminController from '../controllers/AdminController';
import ItineraryController from '@/controllers/ItineraryController';
import DetailController from '@/controllers/DetailController';

const { Navigator, useAppNavigation } = createNavigator(
  {
    App:      AppController,
    Profile:  ProfileController,
    Settings: SettingsController,
    Admin:    AdminController,
    Map:      ItineraryController,
    Detail:   DetailController
  },
  'App',
);

export { useAppNavigation };
export default Navigator;

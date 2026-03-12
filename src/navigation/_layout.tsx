import { createNavigator } from './StackNavigator';
import AppController from '../controllers/AppController';
import ProfileController from '../controllers/ProfileController';
import SettingsController from '../controllers/SettingsController';
import AdminController from '../controllers/AdminController';

const { Navigator, useAppNavigation } = createNavigator(
  {
    App:      AppController,
    Profile:  ProfileController,
    Settings: SettingsController,
    Admin:    AdminController,
  },
  'App',
);

export { useAppNavigation };
export default Navigator;

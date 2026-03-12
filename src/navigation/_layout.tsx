import { createNavigator } from './StackNavigator';
import ProfileController from '../controllers/ProfileController';
import SettingsController from '../controllers/SettingsController';

const { Navigator, useAppNavigation } = createNavigator({
  Profile: ProfileController,
  Settings: SettingsController,
});

export { useAppNavigation };
export default Navigator;

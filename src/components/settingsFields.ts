import { SettingsModel } from '../models/settings';

export type SettingsField = {
  label: string;
  key: keyof SettingsModel;
};

export const settingsFields: SettingsField[] = [
  { label: 'App theme', key: 'app_theme' },
  { label: 'App font size', key: 'app_font_size' },
];

import settingsData from '../data/settings.json';

export type SettingsModel = {
    app_theme: string;
    app_font_size: string;
}

export const getSettings = (): SettingsModel => {
    return settingsData;
}
export type Login = {
  username: string;
  password: string;
};

export type Settings = Partial<Login>;

export async function saveSettings(settings: Partial<Settings>) {
  await chrome.storage.sync.set(settings);
}

export async function getSettings() {
  return chrome.storage.sync.get() as Settings;
}

export function isLoginConfigured(settings: Settings): settings is Login {
  return !!settings.username && !!settings.password;
}

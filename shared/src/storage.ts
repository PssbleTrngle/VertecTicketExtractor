export type Login = {
  username: string;
  password: string;
};

export type Settings = Partial<Login> & {
  defaultMessage: string;
};

export async function saveSettings(settings: Partial<Settings>) {
  await chrome.storage.sync.set(settings);
}

export async function getSettings(): Promise<Settings> {
  const saved = (await chrome.storage.sync.get()) as Partial<Settings>;
  return { defaultMessage: "Implementation", ...saved };
}

export function isLoginConfigured(
  settings: Settings
): settings is Login & Settings {
  return !!settings.username && !!settings.password;
}

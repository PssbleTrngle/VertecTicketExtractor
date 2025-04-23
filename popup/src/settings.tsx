import { Dispatch } from "preact/hooks";
import { Settings } from "shared";

export default function SettingsView({
  value,
  onChange,
}: {
  value: Settings;
  onChange: Dispatch<Partial<Settings>>;
}) {
  return (
    <div className="settings">
      <h3>Settings</h3>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        placeholder="Username"
        value={value.username}
        onInput={(e) => onChange({ username: e.currentTarget.value })}
      />
      <label htmlFor="password">API-Token</label>
      <input
        id="password"
        placeholder="API-Token"
        type="password"
        value={value.password}
        onInput={(e) => onChange({ password: e.currentTarget.value })}
      />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://id.atlassian.com/manage-profile/security/api-tokens"
      >
        Where do I get an API-Token from?
      </a>

      <input
        id="defaultMessage"
        placeholder="Default Message"
        value={value.defaultMessage}
        onInput={(e) => onChange({ defaultMessage: e.currentTarget.value })}
      />
    </div>
  );
}

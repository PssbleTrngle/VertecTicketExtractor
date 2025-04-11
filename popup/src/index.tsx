import { render } from "preact";

import { useCallback, useState } from "preact/hooks";
import {
  getSettings,
  isLoginConfigured,
  saveSettings,
} from "shared/src/storage";
import Loading from "./loading";
import SettingsView from "./settings";
import "./style.css";
import TicketView from "./ticket";
import use from "./use";

type View = "default" | "settings";

export function App() {
  const [view, setView] = useState<View>("default");
  const toggleSettings = useCallback(
    () =>
      setView((current) => {
        if (current === "settings") return "default";
        return "settings";
      }),
    [setView]
  );

  return (
    <>
      <button class="settings-btn" onClick={toggleSettings}>
        {view === "settings" ? "×" : "⚙️"}
      </button>
      <View view={view} />
    </>
  );
}

export function View({ view }: { view: View }) {
  const { value: settings } = use(getSettings);

  if (!settings) return <Loading />;

  if (!isLoginConfigured(settings) || view === "settings") {
    return <SettingsView value={settings} onChange={saveSettings} />;
  }

  return <TicketView login={settings} />;
}

render(<App />, document.getElementById("app")!);

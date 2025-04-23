import {
  bookingColors,
  extractTicket,
  generateMessage,
  getSettings,
  isLoginConfigured,
} from "shared";

function createButton() {
  const button = document.createElement("button");
  button.className = "vertec-booking-btn";
  return button;
}

function getButtonsBar() {
  const buttons = document.querySelector(
    "[data-testid='issue.views.issue-base.context.status-and-approvals-wrapper.status-and-approval'] > div"
  );

  if (!buttons) throw new Error("Unable to locate buttons panel");

  return buttons;
}

window.addEventListener("load", async () => {
  const button = createButton();
  button.innerText = "Loading...";

  try {
    const login = await getSettings();

    if (!isLoginConfigured(login)) {
      console.warn("Atlassian Token for Ticket Extractor not configured");
      return;
    }

    const buttons = getButtonsBar();
    buttons?.appendChild(button);

    const extracted = await extractTicket(login, location.href);
    if (!extracted) throw new Error("Ticket not found");

    if (extracted.bookingType) {
      const info = createButton();
      info.innerText = extracted.bookingType;
      info.style.background = bookingColors[extracted.bookingType];
      info.style.color = "white";
      buttons.appendChild(info);
    }

    button.innerText = "Vertec Entry";

    button.addEventListener("click", async () => {
      const generated = await generateMessage(extracted);
      navigator.clipboard.writeText(generated);
      button.innerText = "Copied!";

      setTimeout(() => {
        button.innerText = "Vertec Entry";
      }, 300);
    });
  } catch (e) {
    console.error("error extracting ticket:", e);
    button.innerText = "Error";
  }
});

import JiraTicket from "./JiraTicket";
import { Login } from "./storage";
import TicketData from "./TicketData";

const regex = /https:\/\/solarlog\.atlassian\.net\/browse\/([\w-_]+)/;

const bookingTypes = ["Opex", "Capex"] as const;
export type BookingType = (typeof bookingTypes)[number];

export const bookingColors: Record<BookingType, string> = {
  Capex: "#d66647",
  Opex: "#7747d6",
};

function isBookingType(label: string): label is BookingType {
  return bookingTypes.includes(label as BookingType);
}

async function fetchTicket(id: string, { username, password }: Login) {
  const hash = btoa(`${username}:${password}`);

  const response = await fetch(
    `https://solarlog.atlassian.net/rest/api/3/issue/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${hash}`,
      },
    }
  );

  if (!response.ok) throw new Error(response.statusText);

  const json = await response.json();
  return json as JiraTicket;
}

async function fetchInitiative(
  ticket: JiraTicket,
  login: Login
): Promise<JiraTicket | undefined> {
  if (ticket.fields.issuetype.name === "Initiative") return ticket;
  if (ticket.fields.parent) {
    const parent = await fetchTicket(ticket.fields.parent.key, login);
    return fetchInitiative(parent, login);
  }
  return undefined;
}

async function queryUrl() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab?.url;
}

export default async function extractTicket(login: Login, customUrl?: string) {
  const url = customUrl ?? (await queryUrl());
  const match = url?.match(regex);
  if (!match) return null;
  const [, ticketId] = match;

  const ticket = await fetchTicket(ticketId, login);
  const initiative = await fetchInitiative(ticket, login);
  const bookingType = initiative?.fields.labels.find(isBookingType);

  return { ticket, initiative, bookingType } satisfies TicketData;
}

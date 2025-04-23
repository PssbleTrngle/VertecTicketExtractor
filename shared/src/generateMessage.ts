import { getSettings } from "./storage";
import TicketData from "./TicketData";

export default async function generateMessage(
  { ticket, initiative }: TicketData,
  message?: string
) {
  const { defaultMessage } = await getSettings();
  const ticketMessage = `${ticket.key}: ${message || defaultMessage}`;
  if (!initiative) return ticketMessage;
  return `${initiative.key}, ${ticketMessage}`;
}

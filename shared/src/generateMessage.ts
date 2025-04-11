import TicketData from "./TicketData";

const defaultMessage = "Development";

export default function generateMessage(
  { ticket, initiative }: TicketData,
  message?: string
) {
  const ticketMessage = `[${ticket.key}]: ${message || defaultMessage}`;
  if (!initiative) return ticketMessage;
  return `[${initiative.key}],${ticketMessage}`;
}

import { BookingType } from "./extractTicket";
import JiraTicket from "./JiraTicket";

type TicketData = {
  ticket: JiraTicket;
  initiative?: JiraTicket;
  bookingType?: BookingType;
};

export default TicketData;

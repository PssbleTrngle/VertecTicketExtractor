import { useCallback, useState } from "preact/hooks";
import {
  BookingType,
  Login,
  bookingColors,
  extractTicket,
  generateMessage,
} from "shared";
import Loading from "./loading";
import use from "./use";

export default function TicketView({ login }: { login: Login }) {
  const { value: extracted, loading } = use(
    () => extractTicket(login),
    [login]
  );
  const [message, setMessage] = useState("");

  const { value: generated } = use(async () => {
    if (!extracted) return extracted;
    return generateMessage(extracted, message);
  }, [message, extracted]);

  const copy = useCallback(() => {
    if (!generated) return;
    window.navigator.clipboard.writeText(generated);
  }, [generated]);

  if (loading) {
    return <Loading />;
  }

  if (!extracted) {
    return <p>Unable to extract JIRA Ticket</p>;
  }

  return (
    <>
      <p>
        Found Ticket <em>{extracted.ticket.key}</em>
      </p>
      <p>{extracted.ticket.fields.summary}</p>
      <input
        placeholder="Message"
        value={message}
        onInput={(e) => setMessage(e.currentTarget.value)}
      />
      <section class="copy-section">
        <label>Generated Message:</label>
        <p class="copy" onClick={copy}>
          {generated}{" "}
          {extracted.bookingType && (
            <BookingTypeLabel>{extracted.bookingType}</BookingTypeLabel>
          )}
        </p>
      </section>
    </>
  );
}

function BookingTypeLabel({ children }: { children: BookingType }) {
  return (
    <label
      class="booking-label"
      style={{ background: bookingColors[children] }}
    >
      {children}
    </label>
  );
}

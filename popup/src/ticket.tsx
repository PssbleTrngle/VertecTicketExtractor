import { useCallback, useMemo, useState } from "preact/hooks";
import { extractTicket, generateMessage } from "shared";
import { BookingType } from "shared/src/extractTicket";
import { Login } from "shared/src/storage";
import Loading from "./loading";
import use from "./use";

const bookingColors: Record<BookingType, string> = {
  Capex: "#d66647",
  Opex: "#7747d6",
};

export default function TicketView({ login }: { login: Login }) {
  const { value: extracted, loading } = use(() => extractTicket(login));
  const [message, setMessage] = useState("");

  const generated = useMemo(
    () => extracted && generateMessage(extracted, message),
    [message, extracted]
  );

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

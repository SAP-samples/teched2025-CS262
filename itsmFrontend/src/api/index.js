// API service layer

import { fetchEventSource } from '@microsoft/fetch-event-source';

const API_BASE = ...;
const SOLUTIONS_ENDPOINT = ...;

export async function searchSolutions(...) {
  const payload = ...;
  const res = await fetch(SOLUTIONS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to fetch solutions");
  const data = await res.json();
  return {};
}

/* EXERCISE 04
export async function generateAnswer(...) {
  const payload = ...;
  try {
    await fetchEventSource(ANSWER_GENERATION_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
      },
      body: JSON.stringify(payload),
      onopen(res) {
        if (!res.ok) throw new Error("Failed to connect to stream");
      },
      onmessage(event) {
        // Parse the event type and the event data
        ...;
      },
      onclose() {
        if (onComplete) onComplete();
      },
      onerror(err) {
        if (onError) onError(err);
      }
    });
  } catch (err) {
    if (onError) onError(err);
  }
}
*/

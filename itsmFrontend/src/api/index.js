// API service layer

import { fetchEventSource } from '@microsoft/fetch-event-source';

const API_BASE = "Cloud_ALM_API";
const SOLUTIONS_ENDPOINT = `/${API_BASE}/http/supportcases/recommendations/solutions`;
const ANSWER_GENERATION_ENDPOINT = `/${API_BASE}/http/supportcases/recommendations/solutions/rag`;

export async function searchSolutions(subject, description, component, stepsToReproduce) {
  const payload = { subject, description, component, stepsToReproduce };
  const res = await fetch(SOLUTIONS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to fetch solutions");
  const data = await res.json();
  return {
    items: (data.results || []).map(doc => ({
      id: doc["results.id"],
      rank: doc["results.rank"],
      summary: doc["results.summary"],
      title: doc["results.title"],
      type: doc["results.type"],
      url: doc["results.url"]
    }))
  };
}

/* EXERCISE 04 */
export async function generateAnswer({ subject, description, component, onData, onError, onComplete }) {
  const payload = { subject, description, component };
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
        if (onData && event.data) {
          onData(JSON.parse(event.event), JSON.parse(event.data));
        }
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

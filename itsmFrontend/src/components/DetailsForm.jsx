import { useState } from "react";
import FormField from "./FormField";
import Suggestions from "./Suggestions";
import { searchSolutions, generateAnswer } from "../api/index";
import GeneratedAnswer from "./GeneratedAnswer";
import TypeFilter from "./TypeFilter";


export default function DetailsForm() {
  const fieldDefaults = {
    subject: "",
    description: "",
    component: "",
    stepsToReproduce: ""
  };
  const [form, setForm] = useState({ ...fieldDefaults });
  const [lastSearch, setLastSearch] = useState({ ...fieldDefaults });
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSug, setLoadingSug] = useState(false);
  const [errors, setErrors] = useState({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [typeFilter, setTypeFilter] = useState([]);
  const typeDisplayMap = {
    kba: 'SAP Knowledge Base Article',
    note: 'SAP Note',
    help: 'SAP Help Portal Documentation',
    community: 'SAP Community Content'
  };
  const [cardsCollapsed, setCardsCollapsed] = useState(false);
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const [loadingStream, setLoadingStream] = useState(false);
  const [sourceTags, setSourceTags] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  // EXERCISE 02
  // Suggestion search logic
  function handleFieldBlur() {
    // Only search if either field has changed since last search
    if (
      form.subject === lastSearch.subject &&
      form.description === lastSearch.description &&
      form.component === lastSearch.component &&
      form.stepsToReproduce === lastSearch.stepsToReproduce
    ) {
      return;
    }

    // Only search if:
    //   - subject has at least 1 char or
    //   - description has at least 3 chars
    if (form.subject.length < 1 && form.description.length < 3) {
      setSuggestions([]);
      return;
    }

    // Set loading screen
    setLoadingSug(true);

    // Perform search
    searchSolutions(form.subject, form.description, form.component, form.stepsToReproduce)
      .then(data => setSuggestions(data.items || []))
      .catch(e => console.error(e))
      .finally(() => {
        setLoadingSug(false);
        setLastSearch({
          subject: form.subject,
          description: form.description,
          component: form.component,
          stepsToReproduce: form.stepsToReproduce
        });
      });
  }

  // EXERCISE 03
  // Filtering logic
  function getAvailableDocumentTypes() {
    // Collect the document types present in the incoming suggestions
    return Array.from(new Set(suggestions.map(s => s.type && s.type.toLowerCase()).filter(Boolean)));
  }
  function filterSuggestions() {
    // Filter the retrieved suggestions based on the selected document types
    if (typeFilter.length === 0){
      return suggestions;
    } else {
      return suggestions.filter(s => s.type && typeFilter.includes(s.type.toLowerCase()));
    }
  }

  // EXERCISE 04
  // Handler for Answer Generation streaming API
  async function handleStreamAPI() {
    setCardsCollapsed(true);
    setStreamedAnswer("");
    setLoadingStream(true);
    setSourceTags([]);
    setShowAnswer(true);

    // Only call service if subject or description is provided
    if (form.subject.length < 1 && form.description.length < 3) {
      setStreamedAnswer("Please provide a title or description to generate an answer.");
      setLoadingStream(false);
      return;
    }

    // Perform the streaming call
    await generateAnswer({
      subject: form.subject,
      description: form.description,
      component: form.component,
      onData: (type, chunk) => {
        // Process incoming event
        // Concatenate together the message-type events to form the answer text.
        if (type === "message") {
          setStreamedAnswer(prev => prev + chunk);
        }

        // Collect the sources from the source-type event
        if (type === "source" && Array.isArray(chunk)) {
          setSourceTags(chunk);
        }
      },
      onError: (err) => {
        setStreamedAnswer("Unable to generate an answer currently. Please try again later.");
        setLoadingStream(false);
      }
    });
    setLoadingStream(false);
  }

  return (
    <div className="max-w-2xl mx-auto mt-14">
      <form
        className="space-y-6"
        aria-label="Search Knowledge"
        id="knowledge-form"
      >

        {/* EXERCISE 02 - ADD FORM FIELDS HERE */}
        <FormField label="Short Title">
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            onBlur={handleFieldBlur}
            className="w-full border rounded px-2 py-1"
            placeholder="Issue summary"
            aria-required="true"
            aria-invalid={!!errors.subject}
          />
          {errors.subject && <span className="text-red-600 text-xs">{errors.subject}</span>}
        </FormField>
        <FormField label="Problem Description">
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            onBlur={handleFieldBlur}
            className="w-full border rounded px-2 py-1"
            rows={3}
            placeholder="Describe the issue"
            aria-required="true"
            aria-invalid={!!errors.description}
          />
          {errors.description && <span className="text-red-600 text-xs">{errors.description}</span>}
        </FormField>

        {/* EXERCISE 03 - ADD ADVANCED SECTION HERE */}
        <div className="border rounded-lg mt-6">
          <button
            type="button"
            className="w-full flex justify-between items-center px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-t-lg focus:outline-none"
            onClick={() => setShowAdvanced((v) => !v)}
            aria-expanded={showAdvanced}
            aria-controls="advanced-section"
          >
            <span className="font-semibold text-gray-700">Advanced</span>
            <svg className={`h-5 w-5 transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showAdvanced && (
            <div id="advanced-section" className="px-4 py-4 space-y-6">
              <FormField label="Component (optional)">
                <input
                  value={form.component || ''}
                  onChange={e => setForm({ ...form, component: e.target.value })}
                  onBlur={handleFieldBlur}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Component (e.g. BC-CCM-MON)"
                  aria-required="false"
                />
              </FormField>
              <FormField label="Steps to Reproduce (optional)">
                <input
                  value={form.stepsToReproduce || ''}
                  onChange={e => setForm({ ...form, stepsToReproduce: e.target.value })}
                  onBlur={handleFieldBlur}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Describe steps to reproduce the issue"
                  aria-required="false"
                />
              </FormField>
            </div>
          )}
        </div>

        {/* Suggested Knowledge Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4 mt-12">
            <h2 className="text-lg font-bold text-indigo-700">Suggested Knowledge</h2>
            {/* EXERCISE 04 - ADD GENEREATE BUTTON HERE */}
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-700 text-white hover:bg-indigo-800 shadow transition text-sm"
              onClick={handleStreamAPI}
              disabled={loadingStream}
            >
              <svg className="w-4 h-4 text-indigo-100" viewBox="0 0 96.21 96.21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M62.96 58.78c4.17 1.4 4.17 7.35 0 8.76C48.62 72.38 42.25 78.76 37.4 93.09c-1.41 4.16-7.31 4.16-8.72 0C23.83 78.76 17.46 72.38 3.12 67.54c-4.17-1.4-4.17-7.35 0-8.76 14.34-4.84 20.71-11.22 25.56-25.55 1.41-4.16 7.31-4.16 8.72 0 4.85 14.33 11.22 20.71 25.56 25.55ZM94.5 20.44c2.27-.76 2.27-4.01 0-4.78-7.82-2.64-11.3-6.12-13.95-13.95-.77-2.27-3.99-2.27-4.76 0-2.64 7.82-6.12 11.3-13.95 13.95-2.27.76-2.27 4.01 0 4.78 7.82 2.64 11.3 6.12 13.95 13.95.77 2.27 3.99 2.27 4.76 0 2.64-7.82 6.12-11.3 13.95-13.95Z" />
              </svg>
              <span className="font-semibold">Generate</span>
            </button>
          </div>
          {/* EXERCISE 04 - ADD ANSWER DISPLAY HERE */}
          {showAnswer && (
            <GeneratedAnswer
              loading={loadingStream}
              answer={streamedAnswer}
              sources={sourceTags}
            />
          )}
          {/* EXERCISE 04 - ADD COLLAPSIBLE AREA HERE */}
          {/* Collapsible document cards & filters area */}
          <div className="mt-6">
            {showAnswer && (
              <button
                type="button"
                className="flex items-center gap-1 px-2 py-1 rounded bg-transparent text-gray-500 hover:bg-gray-100 hover:text-indigo-600 mb-2 transition"
                onClick={() => setCardsCollapsed(v => !v)}
                aria-expanded={!cardsCollapsed}
                aria-controls="cards-section"
              >
                <svg className={`w-4 h-4 transform transition-transform ${cardsCollapsed ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                <span className="text-sm">{cardsCollapsed ? 'Show' : 'Hide'} Knowledge Documents & Filters</span>
              </button>
            )}
            <div id="cards-section" className={cardsCollapsed ? 'hidden' : ''}>
              <TypeFilter
                availableTypes={getAvailableDocumentTypes()}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                typeDisplayMap={typeDisplayMap}
              />
              <Suggestions solutions={filterSuggestions()} loading={loadingSug} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

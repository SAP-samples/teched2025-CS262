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
    // Only search if any field has changed since last search

    // Only search if:
    //   - subject has at least 1 char or
    //   - description at least 3 chars

    // Set loading screen

    // Perform search
  }

  // EXERCISE 03
  // Filtering logic
  function getAvailableDocumentTypes() {
    // Collect the document types present in the incoming suggestions
  }
  function filterSuggestions() {
    // Filter the retrieved suggestions based on the selected document types
  }

  // EXERCISE 04
  // Handler for Answer Generation streaming API
  async function handleStreamAPI() {
  }

  return (
    <div className="max-w-2xl mx-auto mt-14">
      <form
        className="space-y-6"
        aria-label="Search Knowledge"
        id="knowledge-form"
      >

        {/* EXERCISE 02 - FORM FIELDS HERE */}
        <FormField>
          ...
        </FormField>

        {/* EXERCISE 03- ADD ADVANCED SECTION HERE */}

        {/* Suggested Knowledge Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4 mt-12">
            <h2 className="text-lg font-bold text-indigo-700">Suggested Knowledge</h2>
            {/* EXERCISE 04 - ADD GENEREATE BUTTON HERE */}
          </div>
          {/* EXERCISE 04 - ADD ANSWER DISPLAY HERE */}
          {/* EXERCISE 04 - ADD COLLAPSIBLE AREA HERE */}
          <div id="cards-section">
            {/* EXERCISE 03 - LOAD TYPE FILTER ELEMENT HERE */}
            <Suggestions solutions={suggestions} loading={loadingSug} />
          </div>
        </div>
      </form>
    </div>
  );
}

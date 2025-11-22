# Exercise 05 — Customize AI-generated answers with custom prompt templates <!-- omit in toc -->

_Estimated Time: **15 min**_

In this exercise, you extend the Answer Generation API to support custom prompt templates, giving you fine-grained control over how the AI structures its responses. You'll explore the API with custom prompts in a notebook, then implement a frontend text field that lets users provide their own prompt instructions while ensuring the required `{context}` placeholder is present.

## Table of Contents <!-- omit in toc -->

- [API at a glance](#api-at-a-glance)
- [Call the Answer Generation API with custom prompts from Jupyter notebook](#call-the-answer-generation-api-with-custom-prompts-from-jupyter-notebook)
- [Extend the frontend to support custom prompt templates](#extend-the-frontend-to-support-custom-prompt-templates)
- [Summary](#summary)
- [Further reading](#further-reading)

## API at a glance

> [!NOTE]
> The Answer Generation self-service API is currently in beta phase.

- **Endpoint:** `/http/supportcases/recommendations/solutions/rag`
- **Method:** `POST`
- **Request Headers:**
```http
Content-Type: application/json
Accept: text/event-stream
```
- **Request body:**
```json
{
  "reporter": "Reporter of the issue (S-User)",
  "subject": "Subject of the issue (short description)",
  "description": "Description of the issue (long description)",
  "component": "Application component of the incident",
  "customPromptTemplate": "Your custom prompt with {context} placeholder"
}
```

**Key Points:**
- The `customPromptTemplate` field is **optional**. If not provided, the API uses a default summarisation prompt.
- Your custom prompt **must include** the `{context}` placeholder, which will be replaced with relevant SAP knowledge documents.

- **Response as Server-Sent Events (SSE) stream:**
```
event: "message"
retry: 15000
data: "partial text chunk"
time: 1759823535.7548084

event: "source"
retry: 15000
data: [
  {
    "display_name": Knowledge document ID,
    "title": Knowledge document title,
    "url": Knowledge document URL
  }
]
```

## Call the Answer Generation API with custom prompts from Jupyter notebook

:point_right: Head over to your SAP Business Application Studio Dev Space and open the Python Jupyter notebook at `exercises/ex5/assets/ex5_api_exploration.ipynb`.

:point_right: After running the cells to install and import the required libraries, provide values for the `subject`, `description`, and optionally `component` input parameters. Customize the `custom_prompt` variable with your own prompt instructions. **You must include the `{context}` placeholder** in your prompt text. This placeholder will be replaced with the retrieved SAP knowledge documents.

> [!TIP]
> Experiment with your own input parameters or use the example below to test the Answer Generation API.
>
> <details>
> <summary>📝  Example 1</summary>
> </br>
> 
> - **Subject:** API for form launch
> - **Description:** In SuccessFactors system, we wanted to autolaunch the PM forms using CPI. So, just wanted to check if it is possible to autolaunch the form using CPI. If yes, kindly share the api for the same. Got error 403 when creating a form using OData API function import and seems we do not have permission to create performance review form for subject id. Got 500 error when launching forms via OData API.
> - **Prompt** Based on the following SAP knowledge: {context}
Provide a clear and concise solution with: Root cause explanation, Step-by-step resolution, Additional recommendations
> </details>

## Extend the frontend to support custom prompt templates

Now let's add the ability for users to provide custom prompt templates through the UI.

### Update the API layer to pass custom prompts

:point_right: Open `src/api/index.js` and modify the `generateAnswer()` function to accept and pass the `customPromptTemplate` parameter.

- Update the *function signature* and *payload variable*. to include `customPromptTemplate`.

```javascript
export async function generateAnswer({ subject, description, component, customPromptTemplate, onData, onError, onComplete }) {
  const payload = { subject, description, component, customPromptTemplate };
  ...
}
```

### Add the custom prompt form field

:point_right: Open `src/components/DetailsForm.jsx` and add a new text area for the custom prompt template.

- Add the custom prompt text area below the "Problem Description" field, where marked by `{/* EXERCISE 05 - ADD PROMPT FORM FIELD HERE */}`:
```javascript
          {/* EXERCISE 05 - ADD PROMPT FORM FIELD HERE */}
          <FormField label="Custom Prompt (optional)">
            <textarea
              value={form.prompt}
              onChange={(e) => setForm({ ...form, prompt: e.target.value })}
              onBlur={handleFieldBlur}
              className="w-full border rounded px-2 py-1"
              rows={5}
              placeholder="Provide a custom prompt template. Must include {context} placeholder."
              aria-required="true"
              aria-invalid={!!errors.prompt}
            />
            {errors.prompt && <span className="text-red-600 text-xs">{errors.prompt}</span>}
          </FormField>
```

### Pass the custom prompt to the API

:point_right: In the `handleStreamAPI()` function in `src/components/DetailsForm.jsx`, pass the custom prompt to the `generateAnswer()` call:

```javascript
    ...
    // Perform the streaming call
    await generateAnswer({
      subject: form.subject,
      description: form.description,
      component: form.component,
      customPromptTemplate: form.prompt,
      onData: (type, chunk) => {
        ...
      },
      ...
    });
    ...
```

### Update the search function to track prompt changes

:point_right: Modify the `handleFieldBlur()` function to track changes to the prompt field:

- Add `form.prompt === lastSearch.prompt` to the comparison check:
```javascript
  function handleFieldBlur() {
    // Only search if either field has changed since last search
    if (
      form.subject === lastSearch.subject &&
      form.description === lastSearch.description &&
      form.component === lastSearch.component &&
      form.stepsToReproduce === lastSearch.stepsToReproduce &&
      form.prompt === lastSearch.prompt
    ) {
      return;
    }
```

- Include `prompt: form.prompt` when updating `lastSearch`:
```javascript
    setLastSearch({
      subject: form.subject,
      description: form.description,
      component: form.component,
      stepsToReproduce: form.stepsToReproduce,
      prompt: form.prompt
    });
```

## Summary

In this exercise, you enhanced the Answer Generation capability with custom prompt templates:

- Explored the API's `customPromptTemplate` parameter in a notebook, understanding the requirement for the `{context}` placeholder.
- Extended the frontend and API service layer to accept and pass custom prompt templates.
- Tested different prompt templates to see how they affect the generated answer format and content.

## Further reading

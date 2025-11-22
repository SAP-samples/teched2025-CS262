export default function Suggestions({ solutions, loading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {loading ? (
        <div className="col-span-3 flex items-center justify-center py-8">
          <span className="animate-pulse text-indigo-500 font-semibold text-base">Searching...</span>
        </div>
      ) : solutions && solutions.length > 0 ? (
        solutions.slice(0, 6).map(s => (
          <div key={s.id + s.url} className="bg-white border border-indigo-100 rounded-xl shadow-md p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-2">
              {/* EXERCISE 02 - ADD BEST MATCH TAG HERE */}
              {s.rank == 1 && (
                <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold">Best Match</span>
              )}
              {/* EXERCISE 02 - ADD DOCUMENT TYPE HERE */}
              <span className="ml-auto px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-xs font-semibold">{s.type}</span>
            </div>
            {/* EXERCISE 02 - ADD DOCUMENT ID AND TITLE HERE */}
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-700 hover:underline text-base block"
            >
              {s.id} &ndash; {s.title}
            </a>
            {/* EXERCISE 02 - ADD DOCUMENT PREVIEW HERE */}
            <p className="text-sm text-gray-700 mt-2 break-words overflow-hidden" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>
              {s.summary && s.summary.length > 250 ? s.summary.slice(0, 250) + "..." : s.summary}
            </p>
          </div>
        ))
      ) : (
        <div className="col-span-3 flex items-center justify-center py-8">
          <span className="text-gray-400 font-medium">No suggestions</span>
        </div>
      )}
    </div>
  )
}

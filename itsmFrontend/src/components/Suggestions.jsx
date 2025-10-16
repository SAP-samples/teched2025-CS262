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
              {/* EXERCISE 02 - ADD SOLUTION TYPE HERE */}
            </div>
            {/* EXERCISE 02 - ADD SOLUTION ID AND TITLE HERE */}
            {/* EXERCISE 02 - ADD SOLUTION PREVIEW HERE */}
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

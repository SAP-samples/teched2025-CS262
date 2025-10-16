export default function GeneratedAnswer({ loading, answer, sources }) {
  return (
    <>
      {/* Loading animation */}
      {loading && (
        <div className="mb-2">
          <span className="block font-semibold text-base animate-wave bg-gradient-to-r from-indigo-400 via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            Generating...
          </span>
          <style>{`
            @keyframes wave {
              0% { background-position: -200px 0; }
              100% { background-position: 200px 0; }
            }
            .animate-wave {
              background-size: 200% 100%;
              animation: wave 1.5s linear infinite;
            }
          `}</style>
        </div>
      )}

      {/* Actual answer display */}
      <div className="bg-indigo-50 border-l-4 border-indigo-400 border border-gray-200 rounded-xl p-5 min-h-[120px] whitespace-pre-line text-base text-gray-900 shadow transition-all">
        {answer ? answer : (!loading && 'No answer yet.')}
      </div>

      {/* Sources */}
      {sources && sources.length > 0 && (
        <div className="mt-2">
          <span className="block font-medium text-gray-700 mb-1">Sources:</span>
          <div className="flex flex-wrap gap-2">
            {sources.map((tag, idx) => (
              <a
                key={idx}
                href={tag.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-semibold border border-indigo-300 hover:bg-indigo-200 transition"
              >
                {tag.display_name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default function TypeFilter({ availableTypes, typeFilter, setTypeFilter, typeDisplayMap }) {
    return (
        <div className="mb-4 flex flex-wrap gap-2 items-center mt-2">
            {/*  EXERCISE 03 - ADD TYPE FILTER UI HERE */}
            <span className="font-medium text-gray-700">Filter by Type:</span>
            <button
                type="button"
                className={`px-3 py-1 rounded ${typeFilter.length === 0 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setTypeFilter([])}
            >All</button>
            {availableTypes.map(type => (
                <button
                    key={type}
                    type="button"
                    className={`px-3 py-1 rounded ${typeFilter.includes(type) ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setTypeFilter(typeFilter.includes(type)
                        ? typeFilter.filter(t => t !== type)
                        : [...typeFilter, type])}
                >
                    {typeDisplayMap[type] || (type.charAt(0).toUpperCase() + type.slice(1))}
                </button>
            ))}
        </div>
    );
}
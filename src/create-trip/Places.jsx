import React, { useState, useEffect, useRef } from 'react';

function Places({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debounceRef = useRef(null);
  const disableSearchRef = useRef(false); // Block fetch after selection

  useEffect(() => {
    if (disableSearchRef.current) return; // Don't fetch after selection

    if (query.length < 2) {
      setResults([]);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${query}&limit=5`
        );
        const data = await res.json();

        if (data && data.features) {
          setResults(data.features);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error('Error fetching location:', err);
        setResults([]);
      }
    }, 300);
  }, [query]);

  const handleSelect = (place) => {
    const location = `${place.properties.name}, ${place.properties.country}`;
    setQuery(location);
    setResults([]);
    disableSearchRef.current = true; // Block further search
    onSelect(place);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        placeholder="Enter a location"
        onChange={(e) => {
          disableSearchRef.current = false; // Allow search on next type
          setQuery(e.target.value);
        }}
        className="w-full p-2 border rounded"
      />

      {results.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full rounded shadow">
          {results.map((place, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(place)}
            >
              {place.properties.name}, {place.properties.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Places;




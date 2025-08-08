


import React, { useState, useEffect, useRef } from 'react';

function Places({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSelected, setHasSelected] = useState(false); // NEW
  const debounceRef = useRef(null);

  useEffect(() => {
    if (hasSelected) return; // Stop searching if a place is selected
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
  }, [query, hasSelected]);

  const handleSelect = (place) => {
    const location = `${place.properties.name}, ${place.properties.country}`;
    setQuery(location);
    setResults([]);
    setHasSelected(true); // Block further search
    onSelect(place);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setHasSelected(false); // User is searching again
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        placeholder="Enter a location"
        onChange={handleInputChange}
        className="w-full p-2 border rounded"
      />

      {!hasSelected && results.length > 0 && (
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

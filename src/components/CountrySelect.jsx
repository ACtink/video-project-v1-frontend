import { useEffect, useRef, useState } from "react";

function CountrySelect({ value, onChange, countries }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);


  const selectedCountry = countries.find((c) => c.code === value);
  

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {/* INPUT */}
      <input
        type="text"
        value={open ? query : selectedCountry?.name || ""}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          setQuery("");
          setOpen(true);
        }}
        placeholder="Select your country"
        className="
          mt-1 w-full px-4 py-3 rounded-xl
          bg-white/70 text-gray-800
          border border-white/40
          focus:ring-2 focus:ring-indigo-500
          focus:outline-none
        "
        readOnly={!open}
      />

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute z-30 mt-1 w-full
            max-h-48 overflow-y-auto
            rounded-xl
            bg-white/95
            border border-white/30
            shadow-xl
          "
        >
          {filtered.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              No country found
            </div>
          )}

          {filtered.map((c) => (
            <div
              key={c.code}
              onClick={() => {
                onChange(c.code);
                setOpen(false);
                setQuery("");
              }}
              className="
                px-4 py-2.5
                cursor-pointer
                text-gray-800
                hover:bg-indigo-100
                text-sm
              "
            >
              {c.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountrySelect;

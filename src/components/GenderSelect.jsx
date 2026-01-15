import { useEffect, useRef, useState } from "react";

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non_binary", label: "Non-binary" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

function GenderSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selected = GENDERS.find((g) => g.value === value);

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
        readOnly
        value={selected?.label || ""}
        placeholder="Select gender"
        onMouseDown={(e) => {
          e.preventDefault(); // 🔑 stops blur
          setOpen(true); // 🔑 always opens
        }}
        className="
          mt-1 w-full px-4 py-3 rounded-xl
          bg-white/70 text-gray-800
          border border-white/40
          focus:ring-2 focus:ring-indigo-500
          focus:outline-none
          cursor-pointer
        "
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
          {GENDERS.map((g) => (
            <div
              key={g.value}
              onClick={() => {
                onChange(g.value);
                setOpen(false);
              }}
              className="
                px-4 py-2.5
                cursor-pointer
                text-gray-800
                hover:bg-indigo-100
                text-sm
              "
            >
              {g.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenderSelect;

import React, { useState } from "react";

type Item = {
  id: string;
  label: string;
};

const initialItems: Item[] = [
  { id: "a", label: "A" },
  { id: "b", label: "B" },
  { id: "c", label: "C" },
];

export function ReconciliationDemo() {
  const [items, setItems] = useState(initialItems);

  function reverse() {
    setItems([...items].reverse());
  }

  return (
    <div>
      <button onClick={reverse}>Reverse</button>

      <ul>
        {items.map((item, index) => (
          // BUG: unstable key
          <ListItem key={index} label={item.label} />
        ))}
      </ul>
    </div>
  );
}

function ListItem({ label }: { label: string }) {
  const [value, setValue] = useState("");

  return (
    <li>
      <span>{label}</span>
      <input
        aria-label={`input-${label}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </li>
  );
}

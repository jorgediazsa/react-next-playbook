import React, { Profiler, StrictMode, useMemo, useState } from "react";

export type CommitInfo = {
  id: string;
  phase: "mount" | "update";
  actualDuration: number;
};

type Props = {
  /**
   * Called on each commit. Must be triggered by Profiler.
   */
  onCommit: (info: CommitInfo) => void;
};

/**
 * A small demo component whose correctness is validated under StrictMode.
 * - Must not do any side effects in render.
 * - Uses Profiler to report commit information.
 */
export function RenderCommitDemo({ onCommit }: Props) {
  const [count, setCount] = useState(0);

  // Stable handler; don't allocate extra work per render unless needed.
  const increment = () => setCount((c) => c + 1);

  // Example of a pure derived value (no side effects).
  const label = useMemo(() => `Count: ${count}`, [count]);

  return (
    <StrictMode>
      <Profiler
        id="RenderCommitDemo"
        onRender={(id, phase, actualDuration) => {
          onCommit({ id, phase, actualDuration });
        }}
      >
        <div>
          <div aria-label="count-label">{label}</div>
          <button type="button" onClick={increment}>
            Increment
          </button>
        </div>
      </Profiler>
    </StrictMode>
  );
}

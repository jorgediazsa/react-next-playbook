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

let renderSideEffectCounter = 0;

/**
 * A small demo component whose correctness is validated under StrictMode.
 * - Must not do any side effects in render.
 * - Uses Profiler to report commit information.
 */
export function RenderCommitDemo({ onCommit }: Props) {
  // ❌ BUG 1: side-effect in render (StrictMode will amplify)
  renderSideEffectCounter++;

  // ❌ BUG 2: Hook call is fine, but we’ll make behavior flaky via render logic
  const [count, setCount] = useState(0);

  // ❌ BUG 3: derived value depends on side-effect counter, not state
  const label = useMemo(() => `Count: ${renderSideEffectCounter}`, [count]);

  return (
    <StrictMode>
      <Profiler
        // ❌ BUG 4: wrong id — tests expect "RenderCommitDemo"
        id="BrokenProfilerId"
        onRender={(id, phase, actualDuration) => {
          // ❌ BUG 5: wrong shape: phase might be "mount"/"update", but we’re not enforcing types
          // and we also never forward the correct id
          onCommit({ id: "WrongId", phase: phase as any, actualDuration });
        }}
      >
        <div>
          <div aria-label="count-label">{label}</div>

          {/* ❌ BUG 6: not using functional update (can be fine), but keep it simple */}
          <button type="button" onClick={() => setCount(count + 1)}>
            Increment
          </button>
        </div>
      </Profiler>
    </StrictMode>
  );
}
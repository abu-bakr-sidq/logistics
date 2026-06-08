"use client";

import { useEffect, useState } from "react";

export function AnimatedStatNumber({
  value,
  suffix,
  runId,
}: {
  value: number;
  suffix: string;
  runId: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const startedAt = performance.now();
    let frameId = 0;

    function updateNumber(now: number) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(updateNumber);
      }
    }

    frameId = requestAnimationFrame(() => {
      setDisplayValue(0);
      frameId = requestAnimationFrame(updateNumber);
    });

    return () => cancelAnimationFrame(frameId);
  }, [runId, value]);

  return (
    <strong className="stat-number-pop block text-[34px] font-medium leading-none tracking-[-0.02em] text-[#1f5369] sm:text-[42px]">
      {displayValue}
      {suffix}
    </strong>
  );
}

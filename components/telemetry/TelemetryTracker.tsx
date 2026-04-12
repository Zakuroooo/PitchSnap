"use client";

import { useEffect } from "react";

export function TelemetryTracker({ viewId }: { viewId: string }) {
  useEffect(() => {
    // Fire initial page load tracking (View Count)
    fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ viewId, isInitialLoad: true }),
      keepalive: true,
    }).catch(() => {});

    // Every 5 seconds, send an increment of 5 seconds to the totalTimeSeconds
    const interval = setInterval(() => {
      fetch("/api/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ viewId, incrementSeconds: 5 }),
        keepalive: true,
      }).catch(() => {});
    }, 5000);

    return () => clearInterval(interval);
  }, [viewId]);

  return null; // Invisible component
}

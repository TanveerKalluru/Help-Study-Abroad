"use client";
import React, { useEffect, useState } from 'react';

export default function DebugPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/debug/session')
      .then((r) => r.json())
      .then(setData)
      .catch((e) => setData({ error: String(e) }));
  }, []);

  return (
    <main>
      <h1>Session Debug</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}

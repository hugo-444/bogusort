import { useState } from "react";

export function ScannerPanel() {
  const [lastScan, setLastScan] = useState<string | null>(null);

  // html5-qrcode integration will mount here; keeping placeholder for now.
  const handleMockScan = () => {
    const mockCode = `UPC-${Math.floor(Math.random() * 1_000_000)}`;
    setLastScan(mockCode);
  };

  return (
    <section className="card">
      <header>
        <h2>Scanner</h2>
        <p>Camera scanning coming soon. Use mock scan to simulate flow.</p>
      </header>

      <button type="button" onClick={handleMockScan}>
        Mock Scan
      </button>

      {lastScan ? (
        <p>
          Last scan: <strong>{lastScan}</strong>
        </p>
      ) : (
        <p>Awaiting scan…</p>
      )}
    </section>
  );
}


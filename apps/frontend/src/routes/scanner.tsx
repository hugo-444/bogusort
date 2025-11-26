import { ScannerPanel } from "../features/scanner/ScannerPanel";

export function ScannerPage() {
  return (
    <div className="page">
      <ScannerPanel />

      <section className="card">
        <header>
          <h2>Instant Insights</h2>
          <p>Product details and stock levels will render here after scans.</p>
        </header>
        <ul>
          <li>Auto-create products when UPC not found.</li>
          <li>Show locations holding the item (backroom + floor).</li>
          <li>Quick actions: Place, Pull, Move, Adjust.</li>
        </ul>
      </section>
    </div>
  );
}


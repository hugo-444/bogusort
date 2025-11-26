export function ActivityPage() {
  return (
    <div className="page">
      <section className="card">
        <header>
          <h2>Activity Log</h2>
          <p>Reverse chronological feed of InventoryMovement events.</p>
        </header>

        <ul>
          <li>Filters: product, type, user, location.</li>
          <li>Virtualized list for large histories.</li>
          <li>Tap row to see event metadata + audit trail.</li>
        </ul>
      </section>
    </div>
  );
}


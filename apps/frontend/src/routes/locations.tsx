export function LocationsPage() {
  return (
    <div className="page">
      <section className="card">
        <header>
          <h2>Locations</h2>
          <p>
            Unified engine for backroom (04C12) and sales floor (FASH-MT01(02))
            codes. Search, validate, and show current stock.
          </p>
        </header>

        <ul>
          <li>Search bar w/ validation feedback.</li>
          <li>List of products stored in the selected location.</li>
          <li>Shortcuts to movement actions (move, adjust, audit).</li>
        </ul>
      </section>
    </div>
  );
}


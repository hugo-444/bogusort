export function ProductsPage() {
  return (
    <div className="page">
      <section className="card">
        <header>
          <h2>Products</h2>
          <p>
            Filter by department, style, UPC, or search term. This view will
            power quick lookups and edits.
          </p>
        </header>

        <ul>
          <li>Product list table / cards w/ key fields.</li>
          <li>Department + style filters.</li>
          <li>Tap-through to Product Detail route.</li>
        </ul>
      </section>
    </div>
  );
}


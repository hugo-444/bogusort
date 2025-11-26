import { NavLink, Outlet } from "react-router-dom";

export function AppShell() {
  return (
    <div className="app-shell">
      <header>
        <h1>Inventory Manager</h1>
        <p>Scanner-first, location-agnostic inventory control.</p>
      </header>

      <nav>
        <NavLink to="/" end>
          Scanner
        </NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/locations">Locations</NavLink>
        <NavLink to="/activity">Activity</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}


import { RouteObject } from "react-router-dom";
import { AppShell } from "../App";
import { ScannerPage } from "./scanner";
import { ProductsPage } from "./products";
import { LocationsPage } from "./locations";
import { ActivityPage } from "./activity";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <ScannerPage />
      },
      {
        path: "products",
        element: <ProductsPage />
      },
      {
        path: "locations",
        element: <LocationsPage />
      },
      {
        path: "activity",
        element: <ActivityPage />
      }
    ],
    errorElement: (
      <div className="page">
        <h2>Something went wrong</h2>
        <p>Try reloading or navigating back to the scanner.</p>
      </div>
    )
  }
];


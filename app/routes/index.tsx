import type { LinksFunction } from "@remix-run/node";

import stylesUrl from "../styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function indexRoute() {
  return <h1>Hello, Index Route</h1>;
}

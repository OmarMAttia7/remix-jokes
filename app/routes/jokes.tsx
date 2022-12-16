import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import stylesUrl from "~/styles/jokes.css";
import type { JokeList} from "~/types/Joke";
import { JokeListSchema } from "~/types/Joke";
import { db } from "~/utils/db.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type LoaderReturn =
  | { success: true; jokeListItems: JokeList }
  | { success: false };

export const loader = async () => {
  const jokeListItems = await db.joke.findMany({
    take: 5,
    select: { id: true, name: true },
    orderBy: { createdAt: "desc" },
  });

  if (!JokeListSchema.safeParse(jokeListItems).success) {
    return json<LoaderReturn>({
      success: false,
    });
  }

  return json<LoaderReturn>({
    success: true,
    jokeListItems,
  });
};

export default function JokesRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link to="/" title="Remix Jokes" aria-label="Remix Jokes">
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {data.success ? (
                data.jokeListItems.map((joke) => (
                  <li key={joke.id}>
                    <Link to={joke.id}>{joke.name}</Link>
                  </li>
                ))
              ) : (
                <li>Error: Could not fetch data</li>
              )}
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

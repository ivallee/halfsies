import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  NavLink,
  Form
} from "@remix-run/react";


import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { useOptionalUser } from "~/utils";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  const user = useOptionalUser();
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="flex h-full min-h-screen flex-col">
          <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
            <h1 className="text-3xl font-bold">
              <Link to=".">Halfsies</Link>
            </h1>
            <p>{user ? user.email : "Not signed in!"}</p> 
            {user ? (
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                >
                  Logout
                </button>
              </Form>
            ) : (
              <>
                <Link to="/login">Log in</Link>
                <Link to="/join">Register</Link>
              </>
            )}
          </header>

          {/* TODO: Implement signed out state homepage */}
          <main className="flex h-full bg-white">
            <div className="h-full w-80 border-r bg-gray-50">
              <ul>
                <li>
                  <NavLink 
                    to="dashboard"
                    className={({ isActive }) => `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`}
                    >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="friends"
                    className={({ isActive }) => `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`}
                    >
                      Friends
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/groups"
                    className={({ isActive }) => `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`}
                  >
                    Groups
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="flex-1 p-6">
              <Outlet />
            </div>
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

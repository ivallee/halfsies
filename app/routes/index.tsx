import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getUser } from "~/session.server";

export async function loader({ request }: LoaderArgs)  {
  const user = await getUser(request);
  if (user) {
    return redirect("dashboard");
  }
  return json({});
}

export default function Index() {
  return (
    <p>You aren't even logged in!</p>
  );
}

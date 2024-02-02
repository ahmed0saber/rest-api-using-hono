import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import data from "./data.json" assert { type: "json" };

const app = new Hono();

app.get("/", () => {
  return new Response("Welcome to dinosaur API!", {
    status: 200,
    headers: { "access-control-allow-origin": "*" },
  });
});

app.get("/api/", () => {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "access-control-allow-origin": "*" },
  });
});

app.get("/api/:dinosaur", (c) => {
  const dinosaur = c.req.param("dinosaur").toLowerCase();
  const found = data.find((item) => item.name.toLowerCase() === dinosaur);

  if (found) {
    return new Response(JSON.stringify(found), {
      status: 200,
      headers: { "access-control-allow-origin": "*" },
    });
  }

  return new Response("No dinosaurs found.", {
    status: 200,
    headers: { "access-control-allow-origin": "*" },
  });
});

Deno.serve(app.fetch);

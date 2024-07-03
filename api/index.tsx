import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { handle } from "frog/vercel";

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  title: "Herocast0r",
});

app.frame("/", (c) => {
  return c.res({
    image: (
      <div style={{ color: "white", display: "flex", fontSize: 60 }}>
        Add "Herocast0r" Action
      </div>
    ),
    intents: [
      // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
      <Button.AddCastAction action="/log-this">Add</Button.AddCastAction>,
    ],
  });
});

app.castAction(
  "/log-this",
  async (c) => {
    const { actionData } = c;
    const { messageHash } = actionData;

    if (!messageHash) {
      return c.res({
        message: "Message hash not found",
        type: "message",
      });
    }

    const herocastUrl = `https://app.herocast.xyz/conversation/${messageHash}`;
    console.log(
      `Redirecting to ${herocastUrl} for castId ${actionData.castId} from ${actionData.fid}`
    );

    return c.res({
      message: "Redirecting to HeroCast",
      link: herocastUrl,
      type: "message",
    });
  },
  { name: "Log This!", icon: "log" }
);

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== "undefined";
const isProduction = isEdgeFunction || import.meta.env?.MODE !== "development";
devtools(app, isProduction ? { assetsPath: "/.frog" } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);

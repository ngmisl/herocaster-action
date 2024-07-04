import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { handle } from "frog/vercel";
import { Box, Heading, Text, VStack, vars } from "../lib/ui.js";

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  title: "Herocast0r",
  ui: { vars },
});

app.frame("/", (c) => {
  return c.res({
    image: (
      <Box
        grow
        alignHorizontal="center"
        alignVertical="center"
        padding="32"
        backgroundColor="background"
      >
        <Box
          padding="24"
          backgroundColor="pastelPink"
          borderRadius="12"
          borderStyle="solid"
          borderColor="pastelYellow"
          borderWidth="2"
        >
          <Heading fontSize="48" textAlign="center" color="text">
            Add "Herocast0r"
          </Heading>
          <Text fontSize="24" textAlign="center" color="text">
            Action by @metaend.eth
          </Text>
        </Box>
      </Box>
    ),
    intents: [
      <Button.AddCastAction action="/forward">Add</Button.AddCastAction>,
      <Button.Link href="https://www.farcaster.id/metaend.eth">
        Follow @metaend.eth
      </Button.Link>,
    ],
  });
});

app.castAction(
  "/forward",
  async (c) => {
    const { actionData } = c;
    const castIdHash = actionData.castId?.hash;

    if (!castIdHash) {
      return c.res({
        message: "Cast ID hash not found",
        type: "message",
      });
    }

    const herocastUrl = `https://app.herocast.xyz/conversation/${castIdHash}`;
    console.log(
      `Redirecting to ${herocastUrl} for castId ${castIdHash} from ${actionData.fid}`
    );

    return c.res({
      message: "Open cast in HeroCast",
      link: herocastUrl,
      type: "message",
    });
  },
  { name: "Hercast0r!", icon: "log" }
);

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== "undefined";
const isProduction = isEdgeFunction || import.meta.env?.MODE !== "development";
devtools(app, isProduction ? { assetsPath: "/.frog" } : { serveStatic });

export const GET = handle(app);
export const POST = handle(app);

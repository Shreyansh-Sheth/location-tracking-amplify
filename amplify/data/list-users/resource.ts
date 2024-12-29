import { defineFunction } from "@aws-amplify/backend";
console.log("env" + JSON.stringify(process.env));

export const listUsers = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: "listUsers",
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: "./handler.ts",
  // environment: {
  //   AMPLIFY_AUTH_USERPOOL_ID: process.env.AMPLIFY_USERPOOL_ID ?? "",
  // },
});

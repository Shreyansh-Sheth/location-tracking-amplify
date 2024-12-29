import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { env } from "$amplify/env/listUsers";
import { Schema } from "../resource";
type Handler = Schema["listUsers"]["functionHandler"];

const client = new CognitoIdentityProviderClient();
export const handler: Handler = async (event, context) => {
  // your function code goes here

  const command = new ListUsersCommand({
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
  });
  const response = await client.send(command);
  console.log("processed", response.$metadata.requestId);
  console.log(response.Users);
  if (!response.Users) {
    return [];
  }
  const responseList = [];
  for (const user of response.Users) {
    responseList.push({
      email: user.Attributes?.find((attr) => attr.Name === "email")?.Value,
      username: user.Username,
    });
  }

  return responseList;
};

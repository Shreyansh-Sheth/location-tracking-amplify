import { defineAuth } from "@aws-amplify/backend";
import { GROUP_NAMES } from "../const";
import { postConfirmation } from "./post-confirmation/resource";
import { listUsers } from "../data/list-users/resource";
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups: [GROUP_NAMES.ADMIN, GROUP_NAMES.USER],
  triggers: {
    postConfirmation,
  },
  access: (allow) => [
    allow.resource(postConfirmation).to(["addUserToGroup"]),
    allow.resource(listUsers).to(["listUsers"]),
  ],
});

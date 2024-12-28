import { defineFunction } from "@aws-amplify/backend";
import { GROUP_NAMES } from "../../const";

export const postConfirmation = defineFunction({
  name: "post-confirmation",
  // optionally define an environment variable for your group name
  environment: {
    GROUP_NAME: GROUP_NAMES.USER,
  },
});

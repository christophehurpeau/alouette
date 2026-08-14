export interface ExternalOpenLinkBehavior {
  native: "linking" | "webBrowser";
  web: "targetBlank" | "targetSelf";
}

/** In-app themed browser sheet on native, new tab on web. */
export const defaultExternalOpenLinkBehavior: ExternalOpenLinkBehavior = {
  native: "webBrowser",
  web: "targetBlank",
};

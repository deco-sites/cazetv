import { type App, type AppContext as AC } from "@deco/deco";
import { type Secret } from "apps/website/loaders/secret.ts";
import website, { type Props as WebsiteProps } from "apps/website/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import { createHttpClient } from "apps/utils/http.ts";
import { YoutubeAPI } from "../sdk/apps/youtube.ts";
import { default as drizzle } from "site/apps/deco/records.ts";

type WebsiteApp = ReturnType<typeof website>;
type DrizzleApp = ReturnType<typeof drizzle>;

interface Props extends WebsiteProps {
  youtubeAPIKey: Secret;
  passPhrase: Secret;
}

interface State {
  youtube: ReturnType<typeof createHttpClient<YoutubeAPI>>;
  youtubeAPIKey: Secret;
  passPhrase: Secret;
}

/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1/0ac02239-61e6-4289-8a36-e78c0975bcc8
 */
export default function Site(state: Props): App<Manifest, State, [
  WebsiteApp,
  DrizzleApp,
]> {
  const headers = new Headers();
  headers.set("Authorization", `${state.youtubeAPIKey?.get()}`);

  const youtube = createHttpClient<YoutubeAPI>({
    base: "https://www.googleapis.com/youtube/v3",
    headers,
  });

  return {
    state: {
      youtube,
      youtubeAPIKey: state.youtubeAPIKey,
      passPhrase: state.passPhrase,
    },
    manifest,
    // @ts-ignore drizzle will be injected by deco runtime
    dependencies: [
      website(state),
    ],
  };
}
export type SiteApp = ReturnType<typeof Site>;
export type AppContext = AC<SiteApp>;

export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";

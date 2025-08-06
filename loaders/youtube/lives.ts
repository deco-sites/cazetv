import { logger } from "@deco/deco/o11y";
import type { AppContext } from "../../apps/site.ts";
import type { Video, YoutubeAPI } from "../../sdk/apps/youtube.ts";

export const cache = {
  maxAge: 60 * 5, // 5 minutes
};

export const cacheKey = () => "youtube-lives";
// export const defaultVisibility = "private";

// Função auxiliar para tratar respostas da API
async function handleYoutubeResponse(
  responsePromise: Promise<Response>,
): Promise<{ items: YoutubeAPI["GET /search"]["response"]["items"] }> {
  try {
    const response = await responsePromise;

    if (!response.ok) {
      const errorBody = await response.text();
      logger.error(
        `YouTube API error: ${response.status} - ${response.statusText}`,
        {
          status: response.status,
          statusText: response.statusText,
          errorBody,
        },
      );
      return { items: [] }; // Retorna array vazio em caso de erro
    }

    const json = await response.json();
    return json;
  } catch (error) {
    logger.error("Erro ao processar resposta da YouTube API:", {
      error,
    });
    return { items: [] }; // Retorna array vazio em caso de erro
  }
}

export default async function loader(
  _: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<{
  upcoming: Video[];
  live: Video[];
}> {
  try {
    const { youtube, youtubeAPIKey } = ctx;
    const key = youtubeAPIKey?.get();

    const upcomingPromise = youtube["GET /search"]({
      part: "snippet",
      type: "video",
      maxResults: 10,
      order: "date",
      channelId: "UCZiYbVptd3PVPf4f6eR6UaQ",
      eventType: "upcoming",
      key,
      regionCode: "BR",
    });

    const livePromise = youtube["GET /search"]({
      part: "snippet",
      type: "video",
      maxResults: 10,
      order: "date",
      channelId: "UCZiYbVptd3PVPf4f6eR6UaQ",
      eventType: "live",
      key,
      regionCode: "BR",
    });

    const [upcoming, live] = await Promise.all([
      handleYoutubeResponse(upcomingPromise),
      handleYoutubeResponse(livePromise),
    ]);

    const videosResponse = await youtube["GET /videos"]({
      part: "snippet,contentDetails,statistics,status,liveStreamingDetails",
      id: [
        ...upcoming.items.map((item) => item.id.videoId),
        ...live.items.map((item) => item.id.videoId),
      ].join(","),
      key,
      regionCode: "BR",
    });

    if (!videosResponse.ok) {
      const errorBody = await videosResponse.text();
      logger.error(
        `YouTube API error: ${videosResponse.status} - ${videosResponse.statusText}`,
        {
          status: videosResponse.status,
          statusText: videosResponse.statusText,
          errorBody,
        },
      );
      return { upcoming: [], live: [] };
    }

    const videos = await videosResponse.json();

    const videosMap = new Map(
      videos.items.map((video) => [video.id, video]),
    );

    const liveVideos = live.items.map((item) => {
      const video = videosMap.get(item.id.videoId ?? "");
      if (!video) {
        return null;
      }

      return video;
    }).filter((video) => video !== null).sort(
      (a, b) =>
        new Date(b.liveStreamingDetails?.scheduledStartTime || "").getTime() -
        new Date(a.liveStreamingDetails?.scheduledStartTime || "").getTime(),
    );

    const upcomingVideos = upcoming.items.map((item) => {
      if (liveVideos.some((video) => video.id === item.id.videoId)) {
        return null;
      }

      const video = videosMap.get(item.id.videoId ?? "");
      if (!video) {
        return null;
      }

      return video;
    }).filter((video) => video !== null).sort(
      (a, b) =>
        new Date(b.liveStreamingDetails?.scheduledStartTime || "").getTime() -
        new Date(a.liveStreamingDetails?.scheduledStartTime || "").getTime(),
    );

    return {
      upcoming: upcomingVideos,
      live: liveVideos,
    };
  } catch (error) {
    logger.error("Erro ao processar resposta da YouTube API:", {
      error,
    });
    return { upcoming: [], live: [] };
  }
}

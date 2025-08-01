export type Video = {
  kind: "youtube#video";
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default?: {
        url: string;
        width?: number;
        height?: number;
      };
      medium?: {
        url: string;
        width?: number;
        height?: number;
      };
      high?: {
        url: string;
        width?: number;
        height?: number;
      };
      standard?: {
        url: string;
        width?: number;
        height?: number;
      };
      maxres?: {
        url: string;
        width?: number;
        height?: number;
      };
    };
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: "live" | "upcoming" | "none";
    defaultLanguage?: string;
    localized?: {
      title: string;
      description: string;
    };
    defaultAudioLanguage?: string;
  };
  contentDetails?: {
    duration: string;
    dimension: "2d" | "3d";
    definition: "hd" | "sd";
    caption: "true" | "false";
    licensedContent: boolean;
    regionRestriction?: {
      allowed?: string[];
      blocked?: string[];
    };
    contentRating?: {
      mpaaRating?: string;
      pgRating?: string;
      bbfcRating?: string;
      fskRating?: string;
      // ... outros ratings conforme necessário
    };
    projection?: "rectangular" | "360";
    hasCustomThumbnail?: boolean;
  };
  status?: {
    uploadStatus: "uploaded" | "processed" | "failed" | "rejected" | "deleted";
    failureReason?: string;
    rejectionReason?: string;
    privacyStatus: "public" | "unlisted" | "private";
    publishAt?: string;
    license: "youtube" | "creativeCommon";
    embeddable: boolean;
    publicStatsViewable: boolean;
    madeForKids?: boolean;
    selfDeclaredMadeForKids?: boolean;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
  player?: {
    embedHtml: string;
    embedHeight?: number;
    embedWidth?: number;
  };
  topicDetails?: {
    topicIds?: string[];
    relevantTopicIds?: string[];
    topicCategories?: string[];
  };
  recordingDetails?: {
    recordingDate?: string;
  };
  fileDetails?: {
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    container?: string;
    videoStreams?: Array<{
      widthPixels?: number;
      heightPixels?: number;
      frameRateFps?: number;
      aspectRatio?: number;
      codec?: string;
      bitrateBps?: number;
      rotation?: "clockwise" | "counterClockwise" | "none";
      vendor?: string;
    }>;
    audioStreams?: Array<{
      channelCount?: number;
      codec?: string;
      bitrateBps?: number;
      vendor?: string;
    }>;
    durationMs?: number;
    bitrateBps?: number;
    creationTime?: string;
  };
  processingDetails?: {
    processingStatus?: "processing" | "succeeded" | "failed" | "terminated";
    processingProgress?: {
      partsTotal?: number;
      partsProcessed?: number;
      timeLeftMs?: number;
    };
    processingFailureReason?: string;
    fileDetailsAvailability?: string;
    processingIssuesAvailability?: string;
    tagSuggestionsAvailability?: string;
    editorSuggestionsAvailability?: string;
    thumbnailsAvailability?: string;
  };
  suggestions?: {
    processingErrors?: string[];
    processingWarnings?: string[];
    processingHints?: string[];
    tagSuggestions?: Array<{
      tag: string;
      categoryRestricts?: string[];
    }>;
    editorSuggestions?: string[];
  };
  liveStreamingDetails?: {
    actualStartTime?: string;
    actualEndTime?: string;
    scheduledStartTime?: string;
    scheduledEndTime?: string;
    concurrentViewers?: string;
    activeLiveChatId?: string;
  };
  localizations?: Record<string, {
    title: string;
    description: string;
  }>;
};

export interface YoutubeAPI {
  "GET /search": {
    params: {
      q?: string;
      part: "snippet";
      type?: "video" | "channel" | "playlist";
      maxResults?: number;
      order?: "date" | "rating" | "relevance" | "title" | "viewCount";
      channelId?: string;
      eventType?: "live" | "upcoming" | "completed";
      location?: string;
      locationRadius?: string;
      publishedAfter?: string;
      publishedBefore?: string;
      regionCode?: string;
      relevanceLanguage?: string;
      safeSearch?: "moderate" | "none" | "strict";
      topicId?: string;
      videoCaption?: "closedCaption" | "none";
      videoCategoryId?: string;
      videoDefinition?: "any" | "high" | "standard";
      videoDimension?: "2d" | "3d" | "any";
      videoDuration?: "any" | "long" | "medium" | "short";
      videoEmbeddable?: "any" | "true";
      videoLicense?: "any" | "creativeCommon" | "youtube";
      videoSyndicated?: "any" | "true";
      videoType?: "any" | "episode" | "movie";
      key: string;
    };
    response: {
      kind: "youtube#searchListResponse";
      etag: string;
      nextPageToken?: string;
      prevPageToken?: string;
      regionCode?: string;
      pageInfo: {
        totalResults: number;
        resultsPerPage: number;
      };
      items: SearchResult[];
    };
  };
  "GET /videos": {
    params: {
      part: string;
      id: string;
      channelId?: string;
      key: string;
    };
    response: {
      kind: "youtube#videoListResponse";
      etag: string;
      nextPageToken?: string;
      prevPageToken?: string;
      pageInfo: {
        totalResults: number;
        resultsPerPage: number;
      };
      items: Video[];
    };
  };
}

export type SearchResult = {
  kind: "youtube#searchResult";
  etag: string;
  id: {
    kind: "youtube#video" | "youtube#channel" | "youtube#playlist";
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default?: {
        url: string;
        width?: number;
        height?: number;
      };
      medium?: {
        url: string;
        width?: number;
        height?: number;
      };
      high?: {
        url: string;
        width?: number;
        height?: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent?: "live" | "upcoming" | "none";
  };
};

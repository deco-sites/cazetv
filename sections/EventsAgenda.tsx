import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Event {
  time: string;
  logo?: ImageWidget;
  title: string;
  description: string;
  isHighlighted?: boolean;
  isLive?: boolean;
  platforms?: string[];
  link?: string;
  teams?: {
    team1?: ImageWidget;
    team2?: ImageWidget;
  };
}

export interface DateTab {
  label: string;
  value: string;
  isActive?: boolean;
}

export interface Props {
  title?: string;
  backgroundImage?: ImageWidget;
  youtubeLink?: string;
  currentMonth?: string;
  backToTodayText?: string;
  dateTabs?: DateTab[];
  filterLabel?: string;
  filterPlaceholder?: string;
  events?: Event[];
  viewTableText?: string;
}

export default function EventsAgenda({
  title = "AGENDA",
  backgroundImage = "https://assets.decocache.com/cazetv/8ecec3bf-4c95-49b5-9378-7470dba241f3/background-image.png",
  youtubeLink = "#",
  currentMonth = "Julho",
  backToTodayText = "Voltar para hoje",
  dateTabs = [
    { label: "dom", value: "06", isActive: false },
    { label: "Ontem", value: "", isActive: false },
    { label: "Hoje", value: "", isActive: true },
    { label: "Amanhã", value: "", isActive: false },
    { label: "qui", value: "10", isActive: false },
    { label: "sex", value: "11", isActive: false },
  ],
  filterLabel = "Filtrar por tipo de evento",
  filterPlaceholder = "Tudo",
  events = [
    {
      time: "10H",
      logo: "https://assets.decocache.com/cazetv/f09d0d30-de69-44aa-8f04-a7a5021ec804/cazetv-logo.png",
      title: "CaféTV",
      description: "seu reforço diário para copa do mundo de clubes",
      isHighlighted: false,
    },
    {
      time: "AGORA",
      title: "Copa do Mundo de Clubes",
      description: "semifinal",
      isHighlighted: true,
      isLive: true,
      teams: {
        team1: "https://assets.decocache.com/cazetv/37147cf5-c773-4966-8fb3-959a7e4065bd/flamengo-logo.png",
        team2: "https://assets.decocache.com/cazetv/25796712-7f7d-4561-860a-5f44043010d0/esperance-logo.png",
      },
      platforms: ["Youtube", "Disney+", "Prime Video"],
    },
    {
      time: "14H",
      logo: "https://assets.decocache.com/cazetv/7583eeb2-1c27-4778-b378-a3c17f40a898/fcwc-logo.png",
      title: "Copazona",
      description: "direto dos Estados Unidos",
      isHighlighted: false,
    },
    {
      time: "18H",
      logo: "https://assets.decocache.com/cazetv/7583eeb2-1c27-4778-b378-a3c17f40a898/fcwc-logo.png",
      title: "Eurocopa Feminina 2025",
      description: "fase de grupos",
      isHighlighted: false,
    },
    {
      time: "20H",
      logo: "https://assets.decocache.com/cazetv/7583eeb2-1c27-4778-b378-a3c17f40a898/fcwc-logo.png",
      title: "Copazona",
      description: "direto dos Estados Unidos",
      isHighlighted: false,
    },
  ],
  viewTableText = "ver tabela",
}: Props) {
  return (
    <div class="w-full bg-gray-50 min-h-screen">
      <div class="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div class="flex justify-center items-center mb-8 relative">
          <h1 class="text-2xl font-bold text-black tracking-wider">{title}</h1>
          <a 
            href={youtubeLink}
            class="absolute right-0 text-gray-600 hover:text-black flex items-center gap-2 text-sm"
          >
            Youtube
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Month and Back to Today */}
        <div class="flex items-center gap-4 mb-6">
          <span class="text-black font-medium text-lg">{currentMonth}</span>
          <span class="text-gray-400">•</span>
          <button class="text-gray-600 hover:text-black text-sm">
            {backToTodayText}
          </button>
        </div>

        {/* Date Navigation */}
        <div class="flex items-center gap-4 mb-8">
          <button class="p-2 hover:bg-gray-200 rounded text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div class="flex gap-2">
            {dateTabs.map((tab, index) => (
              <button
                key={index}
                class={`px-4 py-2 border rounded text-sm font-medium transition-all ${
                  tab.isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                }`}
              >
                {tab.label}
                {tab.value && (
                  <span class="ml-1 text-xs"> | {tab.value}</span>
                )}
              </button>
            ))}
          </div>

          <button class="p-2 hover:bg-gray-200 rounded text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Filter */}
        <div class="flex justify-end mb-8">
          <div class="relative">
            <select class="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-black">
              <option>{filterPlaceholder}</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <label class="absolute -top-2 left-3 bg-gray-50 px-2 text-xs text-gray-500">
              {filterLabel}
            </label>
          </div>
        </div>

        {/* Events List */}
        <div class="space-y-6">
          {events.map((event, index) => (
            <div key={index}>
              {event.isHighlighted ? (
                /* Highlighted Event - Dark Section */
                <div class="relative bg-black rounded-lg overflow-hidden">
                  {/* Background Pattern */}
                  <div class="absolute right-0 top-0 bottom-0 w-1/2 opacity-20">
                    <div class="w-full h-full bg-gradient-to-l from-yellow-400 via-yellow-500 to-transparent"></div>
                    {/* Geometric pattern */}
                    <div class="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-400 to-yellow-600 opacity-30 transform rotate-12 scale-150"></div>
                  </div>
                  
                  <div class="relative z-10 p-8">
                    {/* Left side - AGORA text */}
                    <div class="absolute left-8 top-1/2 transform -translate-y-1/2 -rotate-90">
                      <span class="text-white text-lg font-bold tracking-widest">AGORA</span>
                    </div>

                    {/* Main content */}
                    <div class="ml-16">
                      {/* Event info */}
                      <div class="mb-6">
                        <div class="flex items-center gap-4 mb-2">
                          <img
                            src="https://assets.decocache.com/cazetv/fifa-logo.png"
                            alt="FIFA"
                            class="w-12 h-12 object-contain"
                          />
                        </div>
                        <h3 class="text-white text-2xl font-bold mb-1">{event.title}</h3>
                        <p class="text-gray-300 text-sm">{event.description}</p>
                      </div>

                      {/* Teams and Live badge */}
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-6">
                          {/* Teams */}
                          {event.teams && (
                            <div class="flex items-center gap-4">
                              {event.teams.team1 && (
                                <img
                                  src={event.teams.team1}
                                  alt="Team 1"
                                  class="w-16 h-16 object-contain"
                                />
                              )}
                              <span class="text-white text-2xl font-bold">X</span>
                              {event.teams.team2 && (
                                <img
                                  src={event.teams.team2}
                                  alt="Team 2"
                                  class="w-16 h-16 object-contain"
                                />
                              )}
                            </div>
                          )}

                          {/* Live Badge */}
                          {event.isLive && (
                            <span class="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                              AO VIVO
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Platforms */}
                      {event.platforms && (
                        <div class="flex gap-2 mt-4">
                          {event.platforms.map((platform, platformIndex) => (
                            <span
                              key={platformIndex}
                              class="bg-gray-800 text-white text-xs px-3 py-1 rounded font-medium"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* View Table Link */}
                      <div class="mt-6">
                        <a
                          href={event.link || "#"}
                          class="text-white hover:text-yellow-400 text-sm flex items-center gap-1 font-medium"
                        >
                          {viewTableText}
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Regular Event */
                <div class="flex items-center gap-6 py-4">
                  {/* Time */}
                  <div class="flex-shrink-0 w-16">
                    <div class="text-2xl font-bold text-black">
                      {event.time}
                    </div>
                  </div>

                  {/* Logo */}
                  <div class="flex-shrink-0">
                    {event.logo && (
                      <img
                        src={event.logo}
                        alt={event.title}
                        class="h-12 w-auto object-contain"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div class="flex-1">
                    <h3 class="text-xl font-bold text-black mb-1">
                      {event.title}
                    </h3>
                    <p class="text-gray-600 text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
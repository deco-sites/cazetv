import type { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "../components/ui/Slider.tsx";
import { useId } from "../sdk/useId.ts";

export interface Event {
  time: string;
  logo?: ImageWidget;
  title: string;
  description: string;
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
  events?: Event[];
}

export default function EventsAgenda({
  backgroundImage =
    "https://assets.decocache.com/cazetv/8ecec3bf-4c95-49b5-9378-7470dba241f3/background-image.png",
  events = [
    {
      time: "10H",
      logo:
        "https://assets.decocache.com/cazetv/f09d0d30-de69-44aa-8f04-a7a5021ec804/cazetv-logo.png",
      title: "CaféTV",
      description: "seu reforço diário para copa do mundo de clubes",
    },
    {
      time: "AGORA",
      title: "Copa do Mundo de Clubes",
      description: "semifinal",
      isLive: true,
      teams: {
        team1:
          "https://assets.decocache.com/cazetv/37147cf5-c773-4966-8fb3-959a7e4065bd/flamengo-logo.png",
        team2:
          "https://assets.decocache.com/cazetv/25796712-7f7d-4561-860a-5f44043010d0/esperance-logo.png",
      },
      platforms: ["Youtube", "Disney+", "Prime Video"],
    },
    {
      time: "14H",
      logo:
        "https://assets.decocache.com/cazetv/7583eeb2-1c27-4778-b378-a3c17f40a898/fcwc-logo.png",
      title: "Copazona",
      description: "direto dos Estados Unidos",
    },
    {
      time: "18H",
      logo:
        "https://assets.decocache.com/cazetv/7583eeb2-1c27-4778-b378-a3c17f40a898/fcwc-logo.png",
      title: "Eurocopa Feminina 2025",
      description: "fase de grupos",
    },
    {
      time: "20H",
      logo:
        "https://assets.decocache.com/cazetv/7583eeb2-1c27-4778-b378-a3c17f40a898/fcwc-logo.png",
      title: "Copazona",
      description: "direto dos Estados Unidos",
    },
  ],
}: Props) {
  const now = new Date();
  const currentDate = now.getDate();
  const currentMonth = now.toLocaleString("pt-BR", { month: "long" });
  const dateStr = ["dom", "seg", "ter", "qua", "qui", "sex", "sab", "dom"];
  const dateTabs = Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (2 - i));
    const isToday = date.getDate() === currentDate;
    const isTomorrow = date.getDate() === currentDate + 1;
    const isYesterday = date.getDate() === currentDate - 1;
    return {
      label: isYesterday
        ? "Ontem"
        : isToday
        ? "Hoje"
        : isTomorrow
        ? "Amanhã"
        : date.toLocaleString("pt-BR", { day: "2-digit" }),
      value: isYesterday || isToday || isTomorrow ? "" : dateStr[date.getDay()],
      isActive: isToday,
    };
  });

  const sliderId = useId();
  const filterId = useId();

  return (
    <div class="w-full bg-gray-50 min-h-screen">
      <div class="container py-8 px-4" id={sliderId}>
        {/* Header */}
        <div class="flex gap-3 justify-center items-center mb-8 relative">
          <h1 class="text-2xl font-bold text-black tracking-wider">AGENDA</h1>
          <p class="text-gray-600 hover:text-black flex items-center gap-2 text-sm">
            <span className="font-bold">Youtube</span>
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </p>
        </div>

        {/* Month and Back to Today */}
        <div class="flex items-center gap-4 mb-6">
          <span class="text-black font-medium text-lg">{currentMonth}</span>
          <span class="text-gray-400">•</span>
          <Slider.Dot index={2}>
            <span class="text-gray-600 hover:text-black text-sm">
              Voltar para hoje
            </span>
          </Slider.Dot>
        </div>

        <div class="flex flex-col lg:flex-row justify-between gap-3 items-center">
          {/* Date Navigation */}
          <div class="flex items-center gap-1 lg:gap-4 mb-8 max-w-[90vw] lg:max-w-xl xl:max-w-4xl 2xl:max-w-5xl">
            <Slider.PrevButton class="p-2 hover:bg-gray-200 rounded text-gray-600">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Slider.PrevButton>
            <Slider rootId={sliderId} class="carousel gap-2">
              {dateTabs.map((tab, index) => (
                <Slider.Item
                  class="w-36 carousel-item"
                  index={index}
                  key={index}
                >
                  <button
                    key={index}
                    class={`px-4 py-2 border-[3px] text-2xl w-full transition-all ${
                      tab.isActive
                        ? "border-black text-black font-bold"
                        : "text-gray-600 border-gray-600 hover:border-black hover:text-black"
                    }`}
                  >
                    {tab.label}
                    {tab.value && <span class="ml-1">| {tab.value}</span>}
                  </button>
                </Slider.Item>
              ))}
            </Slider>
            <Slider.NextButton class="p-2 hover:bg-gray-200 rounded text-gray-600">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Slider.NextButton>
          </div>
          {/* Filter */}
          <div class="flex justify-end mb-8">
            <div class="relative">
              <input type="checkbox" id={filterId} class="hidden peer" />
              <label
                for={filterId}
                class="flex items-center gap-2 cursor-pointer text-2xl peer-checked:[&>svg]:rotate-180"
              >
                Filtrar por tipo de evento{" "}
                <svg
                  class="size-5 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </label>
              <p class="text-2xl text-gray-500">Tudo</p>
              {
                /* <select class="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-black min-w-56">
                <option>Tudo</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <label class="absolute -top-2 left-3 bg-gray-50 px-2 text-xs text-gray-500">
                Filtrar por tipo de evento
              </label> */
              }
            </div>
          </div>
        </div>

        {/* Events List */}
        <div class="space-y-6">
          {events.map((event, index) => (
            <div key={index}>
              {event.isLive
                ? (
                  /* Highlighted Event - Dark Section */
                  <div class="relative bg-black rounded-lg overflow-hidden">
                    {/* Background Pattern */}
                    <img
                      src={backgroundImage}
                      alt="Background Pattern"
                      class="absolute inset-0 w-full h-full object-cover"
                    />

                    <div class="relative z-10 p-8">
                      {/* Left side - AGORA text */}
                      <div class="max-lg:w-full max-lg:text-center max-lg:mb-5 lg:absolute lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:-rotate-90 lg:-left-6">
                        <span class="text-white text-5xl font-bold tracking-widest">
                          AGORA
                        </span>
                      </div>

                      {/* Main content */}
                      <div class="lg:ml-28">
                        {/* Event info */}
                        <div class="mb-6 flex gap-5 lg:gap-10">
                          <div class="flex items-center gap-4 mb-2">
                            <img
                              src={event.logo}
                              alt="Tournament Logo"
                              class="w-auto h-20 object-contain"
                            />
                          </div>
                          <div>
                            <h3 class="text-white text-2xl font-bold mb-1">
                              {event.title}
                            </h3>
                            <p class="text-gray-300 text-sm">
                              {event.description}
                            </p>
                          </div>
                        </div>

                        <div class="bg-[#F7F7F726] w-fit px-5 pt-12 lg:px-9 pb-5 lg:pt-10 relative">
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
                                      class="w-auto h-28 object-contain"
                                    />
                                  )}
                                  <span class="text-white text-2xl font-bold">
                                    X
                                  </span>
                                  {event.teams.team2 && (
                                    <img
                                      src={event.teams.team2}
                                      alt="Team 2"
                                      class="w-auto h-28 object-contain"
                                    />
                                  )}
                                </div>
                              )}
                              {/* Live Badge */}
                              <span class="bg-[#FC3C73] text-white text-xs font-bold px-3 py-1 rounded-full absolute top-5 right-5">
                                AO VIVO
                              </span>
                            </div>
                          </div>
                          {/* Platforms */}
                          {event.platforms && (
                            <div class="flex gap-3 flex-wrap lg:gap-2 mt-4">
                              {event.platforms.map((
                                platform,
                                platformIndex,
                              ) => (
                                <span
                                  key={platformIndex}
                                  class="text-white lg:px-3 lg:py-1 font-medium"
                                >
                                  {platform}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* View Table Link */}
                        <div class="mt-6">
                          <a
                            href={event.link || "#"}
                            class="text-white hover:text-yellow-400 text-2xl flex items-center gap-1 font-medium"
                          >
                            ver tabela
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                : (
                  /* Regular Event */
                  <div class="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 py-4">
                    {/* Time */}
                    <div class="flex-shrink-0 w-16 lg:ml-16">
                      <div class="text-2xl font-bold text-black">
                        {event.time}
                      </div>
                    </div>
                    {/* Logo */}
                    <div class="flex gap-6 items-center">
                      <div class="flex-shrink-0 w-24 flex justify-center items-center">
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
                        <h3 class="text-3xl font-bold text-black mb-1">
                          {event.title}
                        </h3>
                        <p class="text-gray-600 text-2xl">
                          {event.description}
                        </p>
                      </div>
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

// deno-lint-ignore-file
import type { SectionProps } from "@deco/deco";
import { useScript, useSection } from "@deco/deco/hooks";
import { dayOfYear } from "https://deno.land/std@0.224.0/datetime/day_of_year.ts";
import type { Event } from "site/loaders/database/listEvents.ts";
import { AppContext } from "../apps/site.ts";
import Slider from "../components/ui/Slider.tsx";
import { useId } from "../sdk/useId.ts";

export interface DateTab {
  key: string;
  label: string;
  value: string;
  isActive?: boolean;
  dateISO?: string;
}

export interface Props {
  id?: string;
  title?: string;
  /**
   * @ignore
   */
  selectedDate?: string;
  /**
   * @ignore
   */
  eventListId?: string;
}

export async function loader(props: Props, _req: Request, ctx: AppContext) {
  const { events } = await ctx.invoke.site.loaders.database.listEvents();

  return {
    ...props,
    events,
  };
}

function EventList({
  events,
  eventListId,
}: {
  events: (Event & { is_live: boolean })[];
  eventListId: string;
}) {
  return (
    <div id={eventListId}>
      {events.length > 0
        ? events.map((event, index) => (
          <div
            key={index + (event.titulo_evento || "")}
            class={event.is_live
              ? ""
              : "even:bg-[#EFEFEF] relative even:after:bg-[#efefef] after:pointer-events-none after:left-1/2 after:-translate-x-1/2 after:w-screen after:flex after:absolute after:h-full after:top-0 z-0 after:z-[-1]"}
          >
            {event.is_live
              ? (
                /* Highlighted Event - Dark Section */
                <div class="relative bg-black rounded-lg overflow-hidden">
                  {/* Background Pattern */}
                  <img
                    src={event.hero_art_url || ""}
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
                            src={event.logo_campeonato_url || ""}
                            alt="Tournament Logo"
                            class="w-auto h-20 object-contain"
                          />
                        </div>
                        <div>
                          <h3 class="text-white text-lg font-bold mb-1">
                            {event.nome_campeonato}
                          </h3>
                          <p class="text-gray-300 text-sm">
                            {event.rodada}
                          </p>
                        </div>
                      </div>

                      <div class="bg-[#F7F7F726] w-fit px-5 pt-12 lg:px-9 pb-5 lg:pt-10 relative">
                        {/* Teams and Live badge */}
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-6">
                            {/* Teams */}
                            {event.nome_time_mandante && (
                              <div class="flex items-center gap-4">
                                {event.nome_time_mandante && (
                                  <img
                                    src={event.logo_time_mandante_url || ""}
                                    alt="Team 1"
                                    class="w-auto h-28 object-contain"
                                  />
                                )}
                                <span class="text-white text-lg font-bold">
                                  X
                                </span>
                                {event.nome_time_visitante && (
                                  <img
                                    src={event.logo_time_visitante_url ||
                                      ""}
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
                        {event.plataformas_nomes && (
                          <div class="flex gap-3 flex-wrap lg:gap-2 mt-4">
                            {event.plataformas_nomes?.split(",").map((
                              platform,
                              platformIndex,
                            ) => (
                              <span
                                key={platformIndex}
                                class="text-white lg:px-3 lg:py-1 font-medium"
                              >
                                {platform.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* View Table Link */}
                      <div class="mt-6">
                        <a
                          href="#"
                          class="text-white hover:text-yellow-400 text-lg flex items-center gap-1 font-medium"
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
                <div class="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 py-4 lg:py-6">
                  {/* Time */}
                  <div class="flex-shrink-0 w-16 lg:ml-16">
                    <div class="text-lg font-bold text-black">
                      {event.horario}
                    </div>
                  </div>
                  {/* Logo */}
                  <div class="flex gap-6 items-center">
                    <div class="flex-shrink-0 w-24 flex justify-center items-center">
                      {event.logo_campeonato_url && (
                        <img
                          src={event.logo_campeonato_url}
                          alt={event.nome_campeonato || ""}
                          class="h-12 w-auto object-contain"
                        />
                      )}
                    </div>
                    {/* Content */}
                    <div class="flex-1">
                      <h3 class="text-xl font-bold text-black mb-1">
                        {event.nome_campeonato}
                      </h3>
                      <p class="text-gray-600 text-lg">
                        {event.rodada}
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>
        ))
        : (
          <div class="text-center text-lg mt-10 font-bold text-gray-500">
            Nenhum evento encontrado
          </div>
        )}
    </div>
  );
}

export default function EventsAgenda({
  id,
  events: _events,
  selectedDate,
  eventListId: _eventListId,
}: SectionProps<typeof loader>) {
  const now = new Date();
  const currentDate = now.getDate();
  const currentMonth = now.toLocaleString("pt-BR", { month: "long" });
  const dateStr = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb", "dom"];
  const firstDate = new Date(
    _events.find((e) => e.data_jogo)?.data_jogo || "",
  );
  const lastDate = new Date(
    _events.findLast((e) => e.data_jogo)?.data_jogo || "",
  );
  const count = dayOfYear(lastDate) - dayOfYear(firstDate);

  // const dateTabs = events.reduce<DateTab[]>((acc, event) => {
  //   if (!event.data_jogo) return acc;
  //   const date = new Date(event.data_jogo);
  //   const day = date.getDate();
  //   const month = date.getMonth();
  //   const year = date.getFullYear();
  //   const dateKey = `${year}-${month}-${day}`;
  //   const sameYear = year === now.getFullYear();
  //   const sameMonth = month === now.getMonth();
  //   const isToday = date.getDate() === currentDate && sameMonth && sameYear;
  //   const isTomorrow = date.getDate() === currentDate + 1 && sameMonth &&
  //     sameYear;
  //   const isYesterday = date.getDate() === currentDate - 1 && sameMonth &&
  //     sameYear;
  //   if (!acc.find((tab) => tab.key === dateKey)) {
  //     acc.push({
  //       key: dateKey,
  //       label: isYesterday
  //         ? "Ontem"
  //         : isToday
  //         ? "Hoje"
  //         : isTomorrow
  //         ? "Amanhã"
  //         : date.toLocaleString("pt-BR", { dateStyle: "short" }),
  //       value: isToday || isTomorrow || isYesterday
  //         ? ""
  //         : dateStr[date.getDay()],
  //       isActive: isToday,
  //     });
  //   }
  //   return acc;
  // }, []);
  const getDateKey = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const dateTabs = Array.from({ length: count }, (_, i) => {
    const date = new Date(firstDate);
    date.setDate(date.getDate() + i);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const dateKey = getDateKey(date);
    const sameYear = year === now.getFullYear();
    const sameMonth = month === now.getMonth();
    const isToday = day === currentDate && sameMonth && sameYear;
    const isTomorrow = day === currentDate + 1 && sameMonth &&
      sameYear;
    const isYesterday = day === currentDate - 1 && sameMonth &&
      sameYear;
    const selectedDateKey = selectedDate
      ? getDateKey(new Date(selectedDate))
      : null;
    return {
      key: dateKey,
      label: isYesterday
        ? "Ontem"
        : isToday
        ? "Hoje"
        : isTomorrow
        ? "Amanhã"
        : date.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit" }),
      value: isYesterday || isToday || isTomorrow ? "" : dateStr[date.getDay()],
      isActive: selectedDate ? selectedDateKey === dateKey : isToday,
      dateISO: date.toISOString(),
    };
  });

  const todayIndex = dateTabs.findIndex((tab) =>
    tab.key === getDateKey(new Date())
  );

  const sliderId = useId();
  const filterId = useId();

  const currentDayOfYear = dayOfYear(
    selectedDate ? new Date(selectedDate) : new Date(),
  );
  const events = _events.filter((event) => {
    if (!event.data_jogo) return false;
    const date = new Date(event.data_jogo || "");
    return dayOfYear(date) === currentDayOfYear;
  }).map((event) => ({
    ...event,
    is_live: event.data_finalizacao && event.data_jogo
      ? new Date(event.data_finalizacao) < new Date() &&
        new Date() < new Date(event.data_jogo)
      : false,
  }));

  if (_eventListId) {
    return <EventList events={events} eventListId={_eventListId} />;
  }

  const eventListId = useId();

  return (
    <div id={id} class="w-full bg-gray-50 min-h-screen overflow-x-clip">
      <div class="container py-8 px-4" id={sliderId}>
        {/* Header */}
        <div class="flex gap-3 justify-center items-center mb-8 relative">
          <h1 class="text-lg font-bold text-black tracking-wider">AGENDA</h1>
          {
            /* <p class="text-gray-600 hover:text-black flex items-center gap-2 text-sm">
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
          </p> */
          }
        </div>

        {/* Month and Back to Today */}
        <div class="flex items-center gap-4 mb-6">
          <span class="text-black font-medium text-lg">{currentMonth}</span>
          <span class="text-gray-400">•</span>
          <button
            type="button"
            hx-get={useSection({
              props: { selectedDate: new Date().toISOString() },
            })}
            hx-target="closest section"
            hx-swap="outerHTML"
          >
            <span class="text-gray-600 hover:text-black text-sm">
              Voltar para hoje
            </span>
          </button>
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
            <Slider
              rootId={sliderId}
              class="carousel gap-2"
              startIndex={Math.max(0, todayIndex - 2)}
            >
              {dateTabs.map((tab, index) => (
                <Slider.Item
                  class="w-36 carousel-item"
                  index={index}
                  key={tab.key}
                >
                  <button
                    hx-get={useSection({
                      props: {
                        selectedDate: tab.dateISO,
                        eventListId,
                      },
                    })}
                    hx-target={`#${eventListId}`}
                    hx-swap="outerHTML"
                    hx-on:click={useScript((rootId: string) => {
                      const root = document.getElementById(rootId);
                      if (!root) return;

                      const activeButtons = root.querySelectorAll(
                        "[data-active=true]",
                      );
                      activeButtons.forEach((button) => {
                        // @ts-ignore - ignore
                        button.setAttribute("data-active", "false");
                      });

                      // @ts-ignore - ignore
                      const self = this as unknown as HTMLButtonElement;
                      self.setAttribute("data-active", "true");
                    }, sliderId)}
                    data-active={tab.isActive}
                    key={index}
                    class="px-4 py-2 border-[3px] text-lg w-full transition-all text-gray-600 border-gray-400 hover:border-black hover:text-black data-[active=true]:border-black data-[active=true]:text-black data-[active=true]:font-bold"
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
                class="flex items-center gap-2 cursor-pointer text-lg peer-checked:[&>svg]:rotate-180"
              >
                Filtrar por plataforma{" "}
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
              <p class="text-lg text-gray-500">Youtube</p>
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
        <EventList events={events} eventListId={eventListId} />
      </div>
    </div>
  );
}

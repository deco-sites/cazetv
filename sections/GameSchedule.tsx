import { SectionProps } from "@deco/deco";
import type { AppContext } from "../apps/site.ts";
import Slider from "../components/ui/Slider.tsx";
import type { Video } from "../sdk/apps/youtube.ts";

export interface Props {
  id?: string;
}

export async function loader(props: Props, _req: Request, ctx: AppContext) {
  const lives = await ctx.invoke("site/loaders/youtube/lives.ts");

  return {
    ...props,
    lives,
  };
}

export default function GameSchedule({
  id,
  lives,
}: SectionProps<typeof loader>) {
  const GameCard = ({ game }: { game: Video }) => (
    <a
      href={`https://www.youtube.com/watch?v=${game.id}`}
      target="_blank"
      rel="noopener noreferrer"
      class="flex-shrink-0 w-[300px] lg:w-[600px] relative flex flex-col"
    >
      {/* Thumbnail com overlay */}
      <div class="relative w-full">
        <img
          src={game.snippet.thumbnails.high?.url}
          alt={game.snippet.title}
          class="w-full h-full object-cover aspect-video"
        />
      </div>

      {/* Informações embaixo */}
      <div class="py-4">
        <h3 class="text-white font-bold text-xl mb-2">
          {game.snippet.title.replace("AO VIVO: ", "")}
        </h3>
        <p class="text-white text-lg line-clamp-2">
          {game.snippet.description}
        </p>
      </div>
    </a>
  );

  return (
    <section id={id} class="relative" style="background-color: #1F1F1F;">
      {/* Barra superior com gradiente */}
      <div class="gradient-bar"></div>

      <div class="py-12">
        <div class="container mx-auto px-4 lg:px-10 max-w-[1600px]">
          <div class="flex flex-col gap-6">
            {/* Jogos AO VIVO - Mobile */}
            {lives.live && lives.live.length > 0 && (
              <div>
                <div class="flex items-center gap-4 mb-6">
                  <div class="live-badge">
                    <div class="live-badge-dot"></div>
                    <span class="live-badge-text">AO VIVO</span>
                  </div>
                </div>

                <div id="live-games-mobile" class="relative">
                  <Slider
                    rootId="live-games-mobile"
                    scroll="smooth"
                    class="flex gap-4 overflow-x-auto scrollbar-hide"
                  >
                    {lives.live.map((game, index) => (
                      <Slider.Item
                        key={`live-mobile-${index}`}
                        index={index}
                      >
                        <GameCard game={game} />
                      </Slider.Item>
                    ))}
                  </Slider>

                  {/* Botões de navegação para mobile - jogos ao vivo */}
                  {lives.live.length > 1 && (
                    <>
                      <Slider.PrevButton class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 z-10">
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                          >
                          </path>
                        </svg>
                      </Slider.PrevButton>
                      <Slider.NextButton class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 z-10">
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                          >
                          </path>
                        </svg>
                      </Slider.NextButton>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* PRÓXIMOS JOGOS - Mobile */}
            {lives.upcoming && lives.upcoming.length > 0 && (
              <div>
                <h2 class="text-white text-lg font-bold mb-6">
                  PRÓXIMOS JOGOS
                </h2>

                <div id="upcoming-games-mobile" class="relative">
                  <Slider
                    rootId="upcoming-games-mobile"
                    scroll="smooth"
                    class="flex gap-4 overflow-x-auto scrollbar-hide"
                  >
                    {lives.upcoming.map((game, index) => (
                      <Slider.Item
                        key={`upcoming-mobile-${index}`}
                        index={index}
                      >
                        <GameCard game={game} />
                      </Slider.Item>
                    ))}
                  </Slider>

                  {/* Botões de navegação para mobile - próximos jogos */}
                  {lives.upcoming.length > 1 && (
                    <>
                      <Slider.PrevButton class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 z-10">
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 19l-7-7 7-7"
                          >
                          </path>
                        </svg>
                      </Slider.PrevButton>
                      <Slider.NextButton class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 z-10">
                        <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                          >
                          </path>
                        </svg>
                      </Slider.NextButton>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          /* Barra superior com gradiente */
          .gradient-bar {
            width: 100%;
            height: 6px;
            background: linear-gradient(90deg, #F64C68 0%, #FFB800 33.33%, #61B8E0 66.66%, #58C071 100%);
          }
          
          /* Badge AO VIVO principal */
          .live-badge {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 162px;
            height: 49px;
            background: linear-gradient(135deg, #FC3C73 0%, #E91E63 100%);
            border-radius: 25px;
            position: relative;
            box-shadow: 0 4px 15px rgba(252, 60, 115, 0.3);
            gap: 6px;
          }
          
          .live-badge-dot {
            width: 12px;
            height: 12px;
            background: white;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }
          
          .live-badge-text {
            color: white;
            font-weight: bold;
            font-size: 24px;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.7;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `,
        }}
      />
    </section>
  );
}

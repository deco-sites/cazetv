import { useSection } from "@deco/deco/hooks";
import { useDevice } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Game {
  id?: string;
  thumbnail: ImageWidget;
  title: string; // Ex: "Flamengo X Corinthians"
  championship: string; // Ex: "Brasileirão"
  startTime?: string;
  isLive?: boolean;
}

export interface Props {
  liveGames?: Game[];
  upcomingGames?: Game[];
}

export default function GameSchedule({
  liveGames = [
    {
      thumbnail: "https://assets.decocache.com/cazetv/7f734a0b-ce6f-4d33-b4e7-5defed1dabdf/banner-escuro-cazetv.jpg",
      title: "Flamengo X Esperance",
      championship: "Copa do Mundo de Clubes 2025",
      isLive: true
    }
  ],
  upcomingGames = [
    {
      thumbnail: "https://assets.decocache.com/cazetv/7f734a0b-ce6f-4d33-b4e7-5defed1dabdf/banner-escuro-cazetv.jpg",
      title: "Palmeiras X Boca Juniors",
      championship: "Copa Libertadores 2025",
      startTime: "20:00"
    },
    {
      thumbnail: "https://assets.decocache.com/cazetv/7f734a0b-ce6f-4d33-b4e7-5defed1dabdf/banner-escuro-cazetv.jpg",
      title: "Santos X Corinthians",
      championship: "Brasileirão",
      startTime: "16:00"
    }
  ]
}: Props) {
  
  const device = useDevice();
  const isMobile = device !== "desktop";
  
  // Verificar se há jogos ao vivo para aplicar padding no primeiro próximo jogo
  const hasLiveGames = liveGames && liveGames.length > 0;
  
  const GameCard = ({ game, isFirstUpcoming = false }: { game: Game; isFirstUpcoming?: boolean }) => (
    <div class={`flex-shrink-0 min-w-[300px] max-w-[600px] rounded-lg overflow-hidden ${isFirstUpcoming && hasLiveGames ? 'ml-14' : ''}`}>
      {/* Thumbnail com overlay */}
      <div class="relative w-full" style="aspect-ratio: 16/9;">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          class="w-full h-full object-cover"
        />
        
        {/* Overlay escuro */}
        <div class="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Badge AO VIVO para jogos ao vivo */}
        {game.isLive && (
          <div class="absolute top-4 left-4">
            <div class="live-badge-small">
              <div class="live-badge-dot-small"></div>
              <span class="live-badge-text-small">AO VIVO</span>
            </div>
          </div>
        )}

        {/* Horário para jogos futuros */}
        {game.startTime && (
          <div class="absolute top-4 right-4">
            <div class="bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg font-bold">
              {game.startTime}
            </div>
          </div>
        )}
      </div>

      {/* Informações embaixo */}
      <div class="p-4">
        <h3 class="text-white font-bold text-3xl mb-2">
          {game.title}
        </h3>
        <p class="text-white text-2xl">
          {game.championship}
        </p>
      </div>
    </div>
  );

  // Combinar todos os jogos para desktop (ao vivo primeiro)
  const allGames = [...(liveGames || []), ...(upcomingGames || [])];

  return (
    <section class="relative" style="background-color: #1F1F1F;">
      {/* Barra superior com gradiente */}
      <div class="gradient-bar"></div>
      
      <div class="py-12">
        <div class="container mx-auto px-4 lg:px-10 max-w-[1600px]">
          
          {isMobile ? (
            /* LAYOUT MOBILE - Dois carousels separados */
            <div class="flex flex-col gap-6">
              
              {/* Jogos AO VIVO - Mobile */}
              {liveGames && liveGames.length > 0 && (
                <div>
                  <div class="flex items-center gap-4 mb-6">
                    <div class="live-badge">
                      <div class="live-badge-dot"></div>
                      <span class="live-badge-text">AO VIVO</span>
                    </div>
                  </div>
                  
                  <div class="relative">
                    <div 
                      id="live-carousel-mobile" 
                      class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
                      style="scrollbar-width: none; -ms-overflow-style: none;"
                    >
                      {liveGames.map((game, index) => (
                        <GameCard key={`live-mobile-${index}`} game={game} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PRÓXIMOS JOGOS - Mobile */}
              {upcomingGames && upcomingGames.length > 0 && (
                <div>
                  <h2 class="text-white text-2xl font-bold mb-6">PRÓXIMOS JOGOS</h2>
                  
                  <div class="relative">
                    <div 
                      id="upcoming-carousel-mobile" 
                      class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
                      style="scrollbar-width: none; -ms-overflow-style: none;"
                    >
                      {upcomingGames.map((game, index) => (
                        <GameCard 
                          key={`upcoming-mobile-${index}`} 
                          game={game} 
                          isFirstUpcoming={index === 0}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* LAYOUT DESKTOP - Um carousel único */
            <div>
              {/* Título combinado para desktop */}
              <div class="flex items-center gap-6 mb-6">
                {liveGames && liveGames.length > 0 && (
                  <div class="live-badge">
                    <div class="live-badge-dot"></div>
                    <span class="live-badge-text">AO VIVO</span>
                  </div>
                )}
                {upcomingGames && upcomingGames.length > 0 && (
                  <h2 class="text-white text-2xl font-bold">PRÓXIMOS JOGOS</h2>
                )}
              </div>
              
              {/* Carousel único com todos os jogos */}
              {allGames.length > 0 && (
                <div class="relative">
                  <div 
                    id="all-games-carousel" 
                    class="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
                    style="scrollbar-width: none; -ms-overflow-style: none;"
                  >
                    {allGames.map((game, index) => {
                      // Verificar se é o primeiro jogo de próximos (após os jogos ao vivo)
                      const liveGamesCount = liveGames?.length || 0;
                      const isFirstUpcoming = index === liveGamesCount && liveGamesCount > 0;
                      
                      return (
                        <GameCard 
                          key={`all-${index}`} 
                          game={game} 
                          isFirstUpcoming={isFirstUpcoming}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Botões de navegação para desktop */}
                  {allGames.length > 1 && (
                    <>
                      <button 
                        class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
                        onclick="document.getElementById('all-games-carousel').scrollBy({left: -320, behavior: 'smooth'})"
                      >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                      </button>
                      <button 
                        class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
                        onclick="document.getElementById('all-games-carousel').scrollBy({left: 320, behavior: 'smooth'})"
                      >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
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
            height: 18px;
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

          /* Badge AO VIVO pequeno para os cards */
          .live-badge-small {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 8px;
            background: linear-gradient(135deg, #FC3C73 0%, #E91E63 100%);
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(252, 60, 115, 0.3);
            gap: 4px;
          }
          
          .live-badge-dot-small {
            width: 6px;
            height: 6px;
            background: white;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }
          
          .live-badge-text-small {
            color: white;
            font-weight: bold;
            font-size: 12px;
            letter-spacing: 0.5px;
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
        `
      }} />
    </section>
  );
}
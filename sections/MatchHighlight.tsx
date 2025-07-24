import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Team {
  /** Logo do time */
  logo: ImageWidget;
  /** Nome do time */
  name: string;
}

export interface StreamingPlatform {
  /** Nome da plataforma */
  name: string;
  /** Logo da plataforma */
  logo?: ImageWidget;
}

export interface Props {
  /** Imagem de fundo */
  backgroundImage: ImageWidget;
  
  /** Ícone do campeonato */
  championshipIcon: ImageWidget;
  
  /** Nome do campeonato */
  championshipName: string;
  
  /** Fase do campeonato */
  championshipPhase: string;
  
  /** Time da casa */
  homeTeam: Team;
  
  /** Time visitante */
  awayTeam: Team;
  
  /** Status do jogo (ex: "AO VIVO", "HOJE 20H", etc.) */
  matchStatus: string;
  
  /** Cor do status */
  statusColor?: "red" | "blue" | "green" | "yellow";
  
  /** Plataformas de streaming */
  streamingPlatforms: StreamingPlatform[];
  
  /** Texto do link "ver tabela" */
  tableText?: string;
  
  /** URL do link "ver tabela" */
  tableUrl?: string;
}

export default function MatchHighlight({
  backgroundImage,
  championshipIcon,
  championshipName,
  championshipPhase,
  homeTeam,
  awayTeam,
  matchStatus,
  statusColor = "red",
  streamingPlatforms,
  tableText = "ver tabela",
  tableUrl = "#"
}: Props) {
  const statusColors = {
    red: "bg-red-500",
    blue: "bg-blue-500", 
    green: "bg-green-500",
    yellow: "bg-yellow-500"
  };

  return (
    <div class="relative w-full h-[400px] overflow-hidden">
      {/* Background Image */}
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        {/* Overlay gradient */}
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div class="relative z-10 h-full flex items-center">
        <div class="container mx-auto px-6 lg:px-8">
          <div class="flex items-center justify-between">
            
            {/* Left Content */}
            <div class="flex-1 max-w-2xl">
              
              {/* AGORA text (vertical) */}
              <div class="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
                <span class="text-white/80 text-lg font-light tracking-[0.3em] uppercase">
                  AGORA
                </span>
              </div>
              
              {/* Main content with left margin for AGORA text */}
              <div class="ml-16">
                
                {/* Championship Header */}
                <div class="flex items-center gap-4 mb-6">
                  <img 
                    src={championshipIcon} 
                    alt={championshipName}
                    class="w-16 h-16 object-contain"
                  />
                  <div>
                    <h1 class="text-white text-2xl lg:text-3xl font-bold">
                      {championshipName}
                    </h1>
                    <p class="text-white/80 text-lg">
                      {championshipPhase}
                    </p>
                  </div>
                </div>
                
                {/* Match Card */}
                <div class="bg-black/60 backdrop-blur-sm rounded-lg p-6 mb-6 max-w-md">
                  
                  {/* Status Badge */}
                  <div class="flex justify-center mb-4">
                    <span class={`${statusColors[statusColor]} text-white px-3 py-1 rounded-full text-sm font-semibold uppercase`}>
                      {matchStatus}
                    </span>
                  </div>
                  
                  {/* Teams */}
                  <div class="flex items-center justify-center gap-8 mb-6">
                    {/* Home Team */}
                    <div class="flex flex-col items-center">
                      <img 
                        src={homeTeam.logo} 
                        alt={homeTeam.name}
                        class="w-16 h-16 object-contain mb-2"
                      />
                      <span class="text-white text-sm text-center">
                        {homeTeam.name}
                      </span>
                    </div>
                    
                    {/* VS */}
                    <div class="text-white text-2xl font-bold">
                      X
                    </div>
                    
                    {/* Away Team */}
                    <div class="flex flex-col items-center">
                      <img 
                        src={awayTeam.logo} 
                        alt={awayTeam.name}
                        class="w-16 h-16 object-contain mb-2"
                      />
                      <span class="text-white text-sm text-center">
                        {awayTeam.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Streaming Platforms */}
                  <div class="flex justify-center gap-4 text-white/80 text-sm">
                    {streamingPlatforms.map((platform, index) => (
                      <span key={index} class="flex items-center gap-2">
                        {platform.logo && (
                          <img 
                            src={platform.logo} 
                            alt={platform.name}
                            class="w-4 h-4 object-contain"
                          />
                        )}
                        {platform.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Table Link */}
                <a 
                  href={tableUrl}
                  class="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 text-lg"
                >
                  {tableText}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Right side - Decorative elements */}
            <div class="hidden lg:block flex-1">
              {/* Golden circles decoration */}
              <div class="relative">
                <div class="absolute right-0 top-1/2 -translate-y-1/2">
                  <div class="w-96 h-96 border-4 border-yellow-400/30 rounded-full"></div>
                  <div class="absolute top-8 right-8 w-80 h-80 border-2 border-yellow-400/20 rounded-full"></div>
                  <div class="absolute top-16 right-16 w-64 h-64 border border-yellow-400/10 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Red vertical line */}
      <div class="absolute right-1/3 top-0 bottom-0 w-1 bg-red-500"></div>
    </div>
  );
}
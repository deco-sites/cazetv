import type { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "../components/ui/Slider.tsx";
import { useId } from "../sdk/useId.ts";

export interface BannerImage {
  /** Imagem para desktop */
  desktop: ImageWidget;
  /** Imagem para mobile */
  mobile: ImageWidget;
  /** Texto alternativo para acessibilidade */
  alt: string;
  /** Largura da imagem (ex: 100%, 800px) */
  width?: string;
  /** Altura da imagem (ex: 400px, auto) */
  height?: string;
  /** Link para onde a imagem deve levar */
  href?: string;
  /** Abrir link em nova aba */
  target?: "_blank" | "_self";
}

export interface Props {
  /** Lista de imagens do carousel */
  images?: BannerImage[];
  /** Tempo de autoplay em segundos (0 = desabilitado) */
  autoplay?: number;
  /** Mostrar setas de navegação */
  showArrows?: boolean;
  /** Mostrar dots indicadores */
  showDots?: boolean;
  /** Classe CSS personalizada */
  class?: string;
}

export default function BannerCarousel({
  images = [],
  autoplay = 0,
  showArrows = true,
  showDots = true,
  class: className = "",
}: Props) {
  const id = useId();

  if (!images.length) {
    return (
      <div class="w-full h-64 bg-gray-200 flex items-center justify-center">
        <p class="text-gray-500">Adicione imagens ao carousel</p>
      </div>
    );
  }

  return (
    <div id={id} class={`relative w-full flex ${className}`}>
      <Slider
        rootId={id}
        interval={autoplay > 0 ? autoplay * 1000 : undefined}
        infinite={true}
        class="carousel w-full overflow-hidden"
      >
        {images.map((image, index) => (
          <Slider.Item
            index={index}
            class="carousel-item w-full flex-shrink-0"
          >
            {image.href ? (
              <a
                href={image.href}
                target={image.target || "_self"}
                class="block w-full"
              >
                <picture class="block w-full">
                  <source
                    media="(max-width: 767px)"
                    srcSet={image.mobile}
                  />
                  <img
                    src={image.desktop}
                    alt={image.alt}
                    class="w-full object-cover"
                    style={{
                      width: image.width || "100%",
                      height: image.height || "400px",
                    }}
                    loading="lazy"
                  />
                </picture>
              </a>
            ) : (
              <picture class="block w-full">
                <source
                  media="(max-width: 767px)"
                  srcSet={image.mobile}
                />
                <img
                  src={image.desktop}
                  alt={image.alt}
                  class="w-full object-cover"
                  style={{
                    width: image.width || "100%",
                    height: image.height || "400px",
                  }}
                  loading="lazy"
                />
              </picture>
            )}
          </Slider.Item>
        ))}
      </Slider>

      {/* Setas de navegação */}
      {showArrows && images.length > 1 && (
        <>
          <Slider.PrevButton class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </Slider.PrevButton>
          <Slider.NextButton class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </Slider.NextButton>
        </>
      )}

      {/* Dots indicadores */}
      {showDots && images.length > 1 && (
        <div class="absolute bottom-[46px] left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <Slider.Dot index={index} class="group cursor-pointer">
              <div class="w-3 h-3 rounded-full border-2 border-white/70 bg-transparent transition-all duration-300 hover:scale-110 hover:border-white group-disabled:bg-white group-disabled:border-white group-disabled:scale-110" />
            </Slider.Dot>
          ))}
        </div>
      )}
    </div>
  );
}
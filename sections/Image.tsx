import type { ImageWidget } from "apps/admin/widgets.ts";

interface ImageConfig {
  /** Imagem a ser exibida */
  image?: ImageWidget;
  /** Largura da imagem */
  width?: number;
  /** Altura da imagem */
  height?: number;
}

export interface Props {
  /** Configuração da imagem para desktop */
  desktop?: ImageConfig;
  /** Configuração da imagem para mobile */
  mobile?: ImageConfig;
  /** Texto alternativo da imagem */
  alt?: string;
  /** Preload da imagem para LCP (Largest Contentful Paint) */
  preload?: boolean;
}

export default function Image({
  desktop,
  mobile,
  alt = "",
  preload = false,
}: Props) {
  // Se não tiver nenhuma imagem configurada, não renderiza nada
  if (!desktop?.image && !mobile?.image) {
    return null;
  }

  // Usa a imagem desktop como fallback se mobile não estiver configurada
  const desktopImage = desktop?.image;
  const mobileImage = mobile?.image || desktopImage;

  return (
    <picture>
      {/* Imagem para mobile */}
      {mobileImage && (
        <source
          media="(max-width: 767px)"
          srcSet={mobileImage}
          width={mobile?.width}
          height={mobile?.height}
        />
      )}
      
      {/* Imagem para desktop (fallback) */}
      <img
        src={desktopImage || mobileImage}
        alt={alt}
        width={desktop?.width || mobile?.width}
        height={desktop?.height || mobile?.height}
        loading={preload ? "eager" : "lazy"}
        fetchPriority={preload ? "high" : "auto"}
        class="w-full h-auto"
      />
    </picture>
  );
}
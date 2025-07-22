import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface SocialNetwork {
  name: string;
  icon: ImageWidget;
  href: string;
}

export interface Platform {
  name: string;
  logo: ImageWidget;
  href?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface Props {
  /** Logo centralizada no topo do footer */
  centerLogo?: {
    src?: ImageWidget;
    alt?: string;
    href?: string;
  };
  
  /** Seção "Siga a CazeTV" */
  socialSection?: {
    title?: string;
    networks?: SocialNetwork[];
  };
  
  /** Seção "Disponível nas plataformas" */
  platformsSection?: {
    title?: string;
    platforms?: Platform[];
  };
  
  /** Menu de navegação inferior */
  navigation?: NavigationItem[];
}

export default function Footer({
  centerLogo = {
    src: "https://assets.decocache.com/cazetv/da388496-54fc-421a-86de-3155853f8237/cazetv-logo.png",
    alt: "CazeTV",
    href: "/",
  },
  socialSection = {
    title: "Siga a CazeTV",
    networks: [
      {
        name: "YouTube",
        icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04",
        href: "https://youtube.com/@cazetv",
      },
      {
        name: "Instagram", 
        icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04",
        href: "https://instagram.com/cazetv",
      },
      {
        name: "X (Twitter)",
        icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04", 
        href: "https://x.com/cazetv",
      },
      {
        name: "TikTok",
        icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04",
        href: "https://tiktok.com/@cazetv",
      },
    ],
  },
  platformsSection = {
    title: "Disponível nas plataformas",
    platforms: [
      {
        name: "Samsung TV Plus",
        logo: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04",
        href: "#",
      },
      {
        name: "Disney+",
        logo: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04",
        href: "#",
      },
      {
        name: "Prime Video",
        logo: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04",
        href: "#",
      },
      {
        name: "SKY",
        logo: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/67120bcd-936a-4ea5-a760-02ed5c4a3d04",
        href: "#",
      },
    ],
  },
  navigation = [
    { label: "Ao vivo", href: "/ao-vivo" },
    { label: "Todos os jogos", href: "/jogos" },
    { label: "Todas as competições", href: "/competicoes" },
    { label: "Todos os programas", href: "/programas" },
  ],
}: Props) {
  return (
    <footer class="relative bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 pt-20 pb-8">
      {/* Logo centralizada no topo */}
      {centerLogo?.src && (
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <a href={centerLogo.href} class="block">
            <Image
              src={centerLogo.src}
              alt={centerLogo.alt || "Logo"}
              width={80}
              height={80}
              class="rounded-full bg-white p-2 shadow-lg"
            />
          </a>
        </div>
      )}

      <div class="container mx-auto px-4 max-w-6xl">
        {/* Conteúdo principal do footer */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Seção Redes Sociais */}
          <div class="text-left">
            <h3 class="text-gray-700 font-medium mb-4">
              {socialSection?.title}
            </h3>
            <div class="flex gap-4">
              {socialSection?.networks?.map((network) => (
                <a
                  href={network.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block hover:opacity-80 transition-opacity"
                  title={network.name}
                >
                  <Image
                    src={network.icon}
                    alt={network.name}
                    width={40}
                    height={40}
                    class="rounded-lg"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Seção Plataformas */}
          <div class="text-right">
            <h3 class="text-gray-700 font-medium mb-4">
              {platformsSection?.title}
            </h3>
            <div class="flex gap-4 justify-end">
              {platformsSection?.platforms?.map((platform) => (
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block hover:opacity-80 transition-opacity"
                  title={platform.name}
                >
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    width={60}
                    height={40}
                    class="object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Menu de navegação */}
        <div class="border-t border-gray-300 pt-6">
          <nav class="flex flex-wrap justify-center gap-6 md:gap-8">
            {navigation?.map((item) => (
              <a
                href={item.href}
                class="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
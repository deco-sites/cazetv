import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { useScript } from "@deco/deco/hooks";

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
    src:
      "https://assets.decocache.com/cazetv/da388496-54fc-421a-86de-3155853f8237/cazetv-logo.png",
    alt: "CazeTV",
    href: "/",
  },
  socialSection = {
    title: "Siga a CazeTV",
    networks: [
      {
        name: "YouTube",
        icon:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTU4LjUgMTguNzVhNy41IDcuNSAwIDAgMC01LjI1LTUuMjVDNDguNzUgMTIgMzAgMTIgMzAgMTJzLTE4Ljc1IDAtMjMuMjUgMS41YTcuNSA3LjUgMCAwIDAtNS4yNSA1LjI1QzAgMjMuMjUgMCAzMCAwIDMwczAgNi43NSAxLjUgMTEuMjVhNy41IDcuNSAwIDAgMCA1LjI1IDUuMjVDMTEuMjUgNDggMzAgNDggMzAgNDhzMTguNzUgMCAyMy4yNS0xLjVhNy41IDcuNSAwIDAgMCA1LjI1LTUuMjVDNjAgMzYuNzUgNjAgMzAgNjAgMzBzMC02Ljc1LTEuNS0xMS4yNVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNCAzOCAzOCAzMCAyNCAyMnYxNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=",
        href: "https://youtube.com/@cazetv",
      },
      {
        name: "Instagram",
        icon:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMwIDVjNi43NSAwIDcuNTUuMDI1IDEwLjIxMy4xNUM0NS42MjUgNS4zNzUgNDguNzUgNy4xMjUgNTAuNjI1IDlzMS42MjUgNSAxLjg3NSA5LjIxM2MuMTI1IDIuNjYyLjE1IDMuNDYyLjE1IDEwLjIxMnMtLjAyNSA3LjU1LS4xNSAxMC4yMTNjLS4yNSA0LjIxMi0xIDcuMzM3LTIuODc1IDkuMjEycy01IDEuNjI1LTkuMjEyIDEuODc1Yy0yLjY2My4xMjUtMy40NjMuMTUtMTAuMjEzLjE1cy03LjU1LS4wMjUtMTAuMjEzLS4xNWMtNC4yMTItLjI1LTcuMzM3LTEtOS4yMTItMi44NzVzLTEuNjI1LTUtMS44NzUtOS4yMTJDOC45IDM3LjU1IDguODc1IDM2Ljc1IDguODc1IDMwcy4wMjUtNy41NS4xNS0xMC4yMTNjLjI1LTQuMjEyIDEtNy4zMzcgMi44NzUtOS4yMTJzNS0xLjYyNSA5LjIxMi0xLjg3NUMyMi40NSA4LjkgMjMuMjUgOC44NzUgMzAgOC44NzVabTAgNS4yNWMtNi42MjUgMC03LjQzOC4wMjUtMTAuMDYzLjE1LTIuNDM3LjExMi0zLjc2Mi41MjUtNC42MjUuODc1LS45MzguMzc1LTEuODEzLjg3NS0yLjYyNSAxLjY4Ny0uODEyLjgxMy0xLjMxMiAxLjY4OC0xLjY4NyAyLjYyNS0uMzUuODYzLS43NjMgMi4xODgtLjg3NSA0LjYyNS0uMTI1IDIuNjI1LS4xNSAzLjQzOC0uMTUgMTAuMDYzcy4wMjUgNy40MzguMTUgMTAuMDYzYy4xMTIgMi40MzcuNTI1IDMuNzYyLjg3NSA0LjYyNS4zNzUuOTM4Ljg3NSAxLjgxMyAxLjY4NyAyLjYyNS44MTMuODEyIDEuNjg4IDEuMzEyIDIuNjI1IDEuNjg3Ljg2My4zNSAyLjE4OC43NjMgNC42MjUuODc1IDIuNjI1LjEyNSAzLjQzOC4xNSAxMC4wNjMuMTVzNy40MzgtLjAyNSAxMC4wNjMtLjE1YzIuNDM3LS4xMTIgMy43NjItLjUyNSA0LjYyNS0uODc1LjkzOC0uMzc1IDEuODEzLS44NzUgMi42MjUtMS42ODcuODEyLS44MTIgMS4zMTItMS42ODcgMS42ODctMi42MjUuMzUtLjg2My43NjMtMi4xODguODc1LTQuNjI1LjEyNS0yLjYyNS4xNS0zLjQzOC4xNS0xMC4wNjNzLS4wMjUtNy40MzgtLjE1LTEwLjA2M2MtLjExMi0yLjQzNy0uNTI1LTMuNzYyLS44NzUtNC42MjUtLjM3NS0uOTM4LS44NzUtMS44MTMtMS42ODctMi42MjUtLjgxMi0uODEyLTEuNjg3LTEuMzEyLTIuNjI1LTEuNjg3LS44NjMtLjM1LTIuMTg4LS43NjMtNC42MjUtLjg3NUMzNy40MzggMTAuMjc1IDM2LjYyNSAxMC4yNSAzMCAxMC4yNVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0zMCA0MC4yNWMtNS42NjMgMC0xMC4yNS00LjU4Ny0xMC4yNS0xMC4yNVM0NC4zMzcgMTkuNzUgMzAgMTkuNzVzMTAuMjUgNC41ODcgMTAuMjUgMTAuMjVTMzUuNjYzIDQwLjI1IDMwIDQwLjI1Wm0wLTE2LjVjLTMuNDUgMC02LjI1IDIuOC02LjI1IDYuMjVzMi44IDYuMjUgNi4yNSA2LjI1IDYuMjUtMi44IDYuMjUtNi4yNS0yLjgtNi4yNS02LjI1LTYuMjVaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNNDEuNjI1IDE5LjEyNWMwIDEuMzc1LTEuMTI1IDIuNS0yLjUgMi41cy0yLjUtMS4xMjUtMi41LTIuNSAxLjEyNS0yLjUgMi41LTIuNSAyLjUgMS4xMjUgMi41IDIuNVoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=",
        href: "https://instagram.com/cazetv",
      },
      {
        name: "X (Twitter)",
        icon:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ1LjYxIDUuNjI1aDguMjdMMzQuMDkgMjYuMjVsNTIuNSAyOC4xMjVIMzQuMjVsLTEzLjAzNS0xNy4wNDNMMTIuNDcgNTQuMzc1SDQuMmwyMC4yNS0yMy4xMjVMMi41IDUuNjI1aDI0LjM3NWwxMS43ODMgMTUuNTc4TDQ1LjYxIDUuNjI1Wm0tMi45MDMgNDMuODc1aDQuNTgzTDE3LjcxIDEwLjMxM0gxMi43OTNsNDkuOTE0IDM5LjE4N1oiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=",
        href: "https://x.com/cazetv",
      },
      {
        name: "TikTok",
        icon:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQ4Ljk3NSAxNi43MjVjLTMuNzc1LTIuNTI1LTYuMjI1LTYuNzUtNi4yMjUtMTEuNTVWNWgtOC42MjV2MzQuMTc1YzAgNi4yNS01LjEgMTEuMzI1LTExLjM3NSAxMS4zMjVzLTExLjM3NS01LjA3NS0xMS4zNzUtMTEuMzI1YzAtNi4yNSA1LjEtMTEuMzI1IDExLjM3NS0xMS4zMjVjMS4yNSAwIDIuNDc1LjIgMy42MjUuNTc1VjE5LjZjLTEuMTc1LS4yLTIuMzc1LS4zNS0zLjYyNS0uMzVDMTAuMTI1IDE5LjI1IDAgMjkuMzc1IDAgNDEuOTc1UzEwLjEyNSA2NC43IDIyLjc1IDY0LjdzMjIuNzUtMTAuMTI1IDIyLjc1LTIyLjcyNVYyNC42MjVjNC43NzUgMy4wMjUgMTAuMzc1IDQuNzc1IDE2LjM3NSA0Ljc3NVYyMC43NzVjLTQuMTI1IDAtOC4xLS44NzUtMTEuOS0yLjU1WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==",
        href: "https://tiktok.com/@cazetv",
      },
    ],
  },
  platformsSection = {
    title: "Disponível nas plataformas",
    platforms: [
      {
        name: "Samsung TV Plus",
        logo:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iIzAwN0RGRiIvPgo8dGV4dCB4PSIzMCIgeT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNBTVNVTkc8L3RleHQ+Cjx0ZXh0IHg9IjMwIiB5PSIyNiIgZm9udC1mYW1pbHk9IkFcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VFZQbHVzPC90ZXh0Pgo8L3N2Zz4K",
        href: "#",
      },
      {
        name: "Disney+",
        logo:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iIzExM0NDRiIvPgo8dGV4dCB4PSIzMCIgeT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5EaXNuZXkrPC90ZXh0Pgo8L3N2Zz4K",
        href: "#",
      },
      {
        name: "Prime Video",
        logo:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iIzAwQTNEQSIvPgo8dGV4dCB4PSIzMCIgeT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI3IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBSSU1FPC90ZXh0Pgo8dGV4dCB4PSIzMCIgeT0iMjYiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI3IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlZJREVPPC90ZXh0Pgo8L3N2Zz4K",
        href: "#",
      },
      {
        name: "SKY",
        logo:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iI0VEMTQyNCIvPgo8dGV4dCB4PSIzMCIgeT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TS1k8L3RleHQ+Cjwvc3ZnPgo=",
        href: "#",
      },
    ],
  },
  navigation = [
    { label: "JOGOS", href: "#jogos" },
    { label: "PROGRAMAS", href: "#programas" },
  ],
}: Props) {
  const networks = socialSection?.networks || [];
  const platforms = platformsSection?.platforms || [];

  return (
    <footer class="relative bg-white">
      {/* Logo centralizada no topo */}
      {centerLogo?.src && (
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <a href={centerLogo.href} class="block">
            <Image
              src={centerLogo.src}
              alt={centerLogo.alt || "Logo"}
              width={80}
              height={80}
            />
          </a>
        </div>
      )}

      <div class="relative z-0 overflow-clip">
        <div class="w-[500px] h-[700px] bg-[#F64C68] rotate-[-25deg] absolute top-2/3 right-40 blur-3xl [--tw-blur:blur(150px)] rounded-full z-[-1]" />
        <div class="w-[500px] h-[700px] bg-[#61B8E0] rotate-[25deg] absolute top-2/3 right-5 blur-3xl [--tw-blur:blur(150px)] rounded-full z-[-2]" />
        <div class="container mx-auto px-4 lg:px-10 max-w-[1600px] relative pt-20 pb-10">
          {/* Conteúdo principal do footer */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Seção Redes Sociais */}
            <div class="text-left">
              <h3 class="text-gray-700 font-medium text-lg mb-4 max-lg:text-center">
                {socialSection?.title}
              </h3>
              <div class="flex gap-4">
                {networks.map((network) => (
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
                      width={32}
                      height={32}
                    />
                  </a>
                ))}
              </div>
            </div>
            {/* Seção Plataformas */}
            <div class="text-right">
              <h3 class="text-gray-700 font-medium text-lg mb-4 max-lg:text-center">
                {platformsSection?.title}
              </h3>
              <div class="flex gap-4 justify-end">
                {platforms.map((platform) => (
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="block hover:opacity-80 transition-opacity"
                    title={platform.name}
                  >
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      class="object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Menu de navegação */}
          <div class="border-t border-[#1F1F1F40] pt-6">
            <nav class="flex flex-wrap gap-6 md:gap-8">
              {navigation?.map((item) => (
                <a
                  href={item.href}
                  hx-on:click={useScript((href: string) => {
                    if (!href.startsWith("#")) {
                      return;
                    }

                    event?.preventDefault();

                    const targetElement = document.getElementById(
                      href.replace("#", ""),
                    );
                    if (targetElement) {
                      const headerHeight = 80;
                      const targetPosition = targetElement.offsetTop -
                        headerHeight;

                      globalThis.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                      });
                    }
                  }, item.href)}
                  class="text-gray-700 hover:text-gray-900 text-lg transition-colors font-medium cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

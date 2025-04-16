
/// <reference types="vite/client" />

// Fix for missing modules
declare module 'lucide-react';
declare module '@radix-ui/react-avatar';
declare module '@radix-ui/react-checkbox';
declare module '@radix-ui/react-context-menu';
declare module '@radix-ui/react-dropdown-menu';
declare module '@radix-ui/react-label';
declare module '@radix-ui/react-menubar';
declare module '@radix-ui/react-popover';
declare module '@radix-ui/react-progress';
declare module '@radix-ui/react-radio-group';
declare module '@radix-ui/react-select';
declare module '@radix-ui/react-toggle';
declare module '@radix-ui/react-toggle-group';
declare module '@radix-ui/react-slider';
declare module '@radix-ui/react-switch';
declare module 'react-day-picker';
declare module 'embla-carousel-react' {
  import * as React from 'react';
  
  type UseEmblaCarouselType = [
    (instance: HTMLElement | null) => void,
    EmblaCarouselType | null
  ];
  
  interface EmblaCarouselType {
    canScrollNext: () => boolean;
    canScrollPrev: () => boolean;
    scrollNext: () => void;
    scrollPrev: () => void;
    scrollTo: (index: number) => void;
    selectedScrollSnap: () => number;
    on: (event: string, callback: (api: EmblaCarouselType) => void) => void;
    off: (event: string, callback: (api: EmblaCarouselType) => void) => void;
  }
  
  interface UseEmblaCarouselOptions {
    axis?: 'x' | 'y';
    [key: string]: any;
  }
  
  declare function useEmblaCarousel(
    options?: UseEmblaCarouselOptions,
    plugins?: any[]
  ): UseEmblaCarouselType;
  
  export default useEmblaCarousel;
  export type { EmblaCarouselType, UseEmblaCarouselOptions };
}

declare module 'cmdk';
declare module 'vaul';
declare module 'react-resizable-panels';
declare module 'input-otp' {
  import * as React from 'react';

  export interface SlotProps {
    char: string;
    hasFakeCaret: boolean;
    isActive: boolean;
  }

  export interface OTPInputContext {
    slots: SlotProps[];
  }

  export const OTPInput: React.ForwardRefExoticComponent<any> & {
    Context: React.Context<OTPInputContext>;
  };
}
declare module 'lovable-tagger' {
  export function componentTagger(): any;
}

// Fix vite configuration
declare module '@vitejs/plugin-react-swc';
declare module 'vite' {
  export function defineConfig(config: any): any;
}

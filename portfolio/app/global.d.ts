export {};

declare global {
  interface Window {
    lenis: any;
  }
}

declare global {
  interface Window {
    lenis: any;
  }

  interface LenisScrollEvent {
    scroll: number;
    limit: number;
    velocity: number;
    direction: number;
    progress: number;
  }
}
